package employees

import (
	"errors"
	postgres "luka/internal/database"
	"luka/internal/models"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrEmailExists     = errors.New("email already exists")
	ErrHashingFailed   = errors.New("failed to hash password")
	ErrDatabaseFailure = errors.New("database error")
	ErrDeletionFailure = errors.New("failed to delete employee")
)

func InsertEmployee(newEmployee *models.Employee) (ID int, Error error) {

	var exists bool

	checkQuery := "SELECT EXISTS(SELECT 1 FROM employee WHERE email = $1)"
	err := postgres.PostgresRef.QueryRow(checkQuery, newEmployee.Email).Scan(&exists)
	if err != nil {
		return 0, ErrDatabaseFailure
	}
	if exists {
		return 0, ErrEmailExists
	}

	newEmployee.Email = "employee." + newEmployee.Email
	var insertQuery string = "INSERT INTO employee(username,email,password,admin_id,department,phone,salary,joining_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id"
	hashedPassword, Err := bcrypt.GenerateFromPassword([]byte(newEmployee.Password), bcrypt.DefaultCost)

	if Err != nil {
		return 0, ErrHashingFailed
	}

	var newEmployeeID int
	newEmployee.Password = string(hashedPassword)

	insertErr := postgres.PostgresRef.QueryRow(insertQuery, newEmployee.Username, newEmployee.Email, newEmployee.Password, newEmployee.AdminId, newEmployee.Department, newEmployee.Phone, newEmployee.Salary, newEmployee.Join_Date).Scan(&newEmployeeID)

	if insertErr != nil {
		return 0, ErrDatabaseFailure
	}

	return newEmployeeID, nil

}

func GetAllEmployees(AdminID int) (Employees []models.PublicEmployee, Error error) {

	var AllEmployees = make([]models.PublicEmployee, 0)

	var selectAllQuery string = "SELECT id,username,email,admin_id,department,salary,phone,joining_date FROM employee WHERE admin_id=$1"

	rows, err := postgres.PostgresRef.Query(selectAllQuery, AdminID)

	if err != nil {
		return AllEmployees, ErrDatabaseFailure
	}

	defer rows.Close()

	for rows.Next() {
		var employee models.PublicEmployee

		err := rows.Scan(&employee.ID, &employee.Username, &employee.Email, &employee.AdminId, &employee.Department, &employee.Salary, &employee.Phone, &employee.Join_Date)

		if err != nil {
			return AllEmployees, ErrDatabaseFailure
		}

		AllEmployees = append(AllEmployees, employee)
	}

	if err = rows.Err(); err != nil {
		return AllEmployees, ErrDatabaseFailure
	}

	return AllEmployees, nil
}

func DeleteEmployee(employeeId int) error {

	var deleteQuery string = "DELETE FROM employee WHERE id=$1"

	result, err := postgres.PostgresRef.Exec(deleteQuery, employeeId)

	if err != nil {
		return ErrDeletionFailure
	}

	rowsEffected, err := result.RowsAffected()

	if err != nil {
		return ErrDeletionFailure
	}

	if rowsEffected == 0 {
		return ErrDeletionFailure
	}

	return nil
}
