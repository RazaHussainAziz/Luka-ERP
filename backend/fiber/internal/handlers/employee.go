package handlers

import (
	"errors"
	"strconv"

	"luka/internal/models"
	"luka/internal/services/employees"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var (
	ErrEmailExists     = errors.New("email already exists")
	ErrHashingFailed   = errors.New("failed to hash password")
	ErrDatabaseFailure = errors.New("database error")
	ErrInvalidRequest  = errors.New("invalid request")
	ErrOperationFailed = errors.New("operation failed")
)

func AddEmployee(context *fiber.Ctx) error {

	claims := context.Locals("claims").(jwt.MapClaims)

	FloatId := claims["sub"].(float64)
	AdminId := int(FloatId)

	var newEmployee models.Employee

	newEmployee.AdminId = AdminId
	if err := context.BodyParser(&newEmployee); err != nil {

		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    400,
			"success": false,
			"error":   "failed to parse request",
		})
	}

	newEmployeeID, err := employees.InsertEmployee(&newEmployee)

	if err != nil {
		if err.Error() == ErrEmailExists.Error() {
			return context.Status(400).JSON(fiber.Map{
				"code":    400,
				"success": false,
				"error":   ErrEmailExists.Error(),
			})
		} else if err.Error() == ErrHashingFailed.Error() {
			return context.Status(500).JSON(fiber.Map{
				"code":    500,
				"success": false,
				"error":   ErrHashingFailed.Error(),
			})
		} else if err.Error() == ErrDatabaseFailure.Error() {
			return context.Status(500).JSON(fiber.Map{
				"code":    500,
				"success": false,
				"error":   ErrDatabaseFailure.Error(),
			})
		}
	}

	return context.Status(201).JSON(fiber.Map{
		"code":     201,
		"success":  true,
		"response": newEmployeeID,
	})

}

func FetchEmployees(context *fiber.Ctx) error {

	claims := context.Locals("claims").(jwt.MapClaims)

	FloatId := claims["sub"].(float64)
	AdminId := int(FloatId)

	allEmployees, err := employees.GetAllEmployees(AdminId)

	if err != nil {

		return context.Status(500).JSON(fiber.Map{
			"code":    500,
			"success": false,
			"error":   ErrDatabaseFailure.Error(),
		})

	}

	return context.Status(200).JSON(fiber.Map{

		"success":  true,
		"response": allEmployees,
	})
}

func DeleteEmployee(context *fiber.Ctx) error {

	employeeId, Err := strconv.Atoi(context.Params("employeeId"))

	if Err != nil {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   ErrInvalidRequest.Error(),
		})
	}

	err := employees.DeleteEmployee(employeeId)

	if err != nil {
		return context.Status(501).JSON(fiber.Map{
			"success": false,
			"error":   ErrOperationFailed.Error(),
		})
	}

	return context.SendStatus(fiber.StatusNoContent)
}
