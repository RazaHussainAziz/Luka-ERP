package routes

import (
	"luka/internal/handlers"
	auth "luka/internal/middleware"

	"github.com/gofiber/fiber/v2"
)

func Routes(server *fiber.App) {

	baseApiURL := server.Group("/api/v1")

	//Employee Routes
	employeeApi := baseApiURL.Group("/employee")
	employeeApi.Get("/fetch", auth.AuthMiddleware, handlers.FetchEmployees)
	employeeApi.Post("/insert", auth.AuthMiddleware, handlers.AddEmployee)
	employeeApi.Delete("/delete/:employeeId", auth.AuthMiddleware,handlers.DeleteEmployee)

}
