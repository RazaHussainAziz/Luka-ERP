package models

type Employee struct {
	ID         int    `json:"id"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Department string `json:"department"`
	Phone      string `json:"phone"`
	Salary     int    `json:"salary"`
	Join_Date  string `json:"joining_date"`
	AdminId    int    `json:"admin_id"`
}

type PublicEmployee struct {
	ID         int    `json:"id"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Department string `json:"department"`
	Salary     int    `json:"salary"`
	Phone      string `json:"phone"`
	Join_Date  string `json:"joining_date"`
	AdminId    int    `json:"admin_id"`
}

type EmployeeID struct {
	ID int `json:"id"`
}
