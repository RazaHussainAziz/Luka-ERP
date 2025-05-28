package inventory

import (
	"fmt"
	postgres "luka/database"

	"github.com/gofiber/fiber/v2"
)

type Inventory struct {
	Product    string `json:"product"`
	SKU_Code   string `json:"sku_code"`
	Category   string `json:"category"`
	Brand      string `json:"brand"`
	Cost_Price int    `json:"cost_price"`
	Sell_Price int    `json:"sell_price"`
	Quantity   int    `json:"quantity"`
	Min_Stock  int    `json:"min_stock"`
	Admin_Id   int    `json:"admin_id"`
}

type ID struct {
	Admin_Id int `json:"admin_id"`
}

func AddToInventory(context *fiber.Ctx) error {

	newItem := new(Inventory)

	err := context.BodyParser(newItem)
	fmt.Println(newItem)
	if err != nil {
		fmt.Println(err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    400,
			"success": false,
			"error":   "client side error",
		})
	}

	query := `INSERT INTO inventory (product,sku_code,category,brand,cost_price,sell_price,quantity,min_stock,admin_id) 
	VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`

	_, Err := postgres.PostgresRef.Exec(query, newItem.Product, newItem.SKU_Code, newItem.Category, newItem.Brand, newItem.Cost_Price, newItem.Sell_Price, newItem.Quantity, newItem.Min_Stock, newItem.Admin_Id)

	if Err != nil {
		fmt.Println(err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":    500,
			"success": false,
			"error":   "internal server error",
		})
	}

	return context.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    201,
		"success": true,
	})
}

func GetInventoryItems(context *fiber.Ctx) {}
