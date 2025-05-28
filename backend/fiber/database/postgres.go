package postgres

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var PostgresRef *sql.DB

func ConnectDB() {

	connectionString := "postgresql://postgres:postgres@localhost:5432/lukadb"
	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("PostgreSQL Connection Started")
	PostgresRef = db
}
