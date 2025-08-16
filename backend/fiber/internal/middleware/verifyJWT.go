package auth

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(context *fiber.Ctx) error {

	tokenStr := context.Cookies("token")

	if tokenStr == "" {
		return context.Redirect("/auth-page")
	}

	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (any, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return context.Redirect("/auth-page")
	}

	claims := token.Claims.(jwt.MapClaims)

	context.Locals("claims", claims)

	return context.Next()

}
