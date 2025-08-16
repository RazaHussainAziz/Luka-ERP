package postgres

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var PostgresRef *sql.DB

func ConnectDB() {

	connectionString := os.Getenv("POSTGRES_URI")

	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Fatal(err)
	}

	PostgresRef = db
}
