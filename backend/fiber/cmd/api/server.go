package main

import (
	"log"
	postgres "luka/internal/database"
	"luka/internal/routes"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Printf("warning: .env file not loaded (%v)", err)
	}
	
	postgres.ConnectDB()

	server := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	})
	server.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowMethods:     "GET,POST,DELETE",
		AllowCredentials: true,
	}))
	routes.Routes(server)
	server.Listen(":8000")
}
