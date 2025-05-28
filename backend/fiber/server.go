package main

import (
	postgres "luka/database"
	"luka/services/inventory"
	"time"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	ID    int    `db:"id"`
	Email string `db:"email"`
}

func main() {

	postgres.ConnectDB()

	server := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	})

	server.Post("/inventory", inventory.AddToInventory)
	server.Listen(":8000")
}
