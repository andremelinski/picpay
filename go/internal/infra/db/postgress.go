package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

// connStr := fmt.Sprintf(
// 	"host=%s port=%s user=%s password=%s dbname=%s search_path=%s sslmode=disable",
// 	host, port, user, password, dbname, schema)

// // Open the connection
// db, err := sql.Open("postgres", connStr)

type DBConfig struct {
	DB_HOST   string
	DB_PORT   int
	DB_USER   string
	DB_PASS   string
	DB_NAME   string
	DB_SCHEMA string
}

type PostgressDB struct {
	DBConfig *DBConfig
}

func NewPostgressDB(dBConfig *DBConfig) *PostgressDB {
	return &PostgressDB{dBConfig}

}

func (p *PostgressDB) PostgressConnection() (*sql.DB, error) {
	dbConfig := p.DBConfig
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s search_path=%s sslmode=disable",
		dbConfig.DB_HOST, dbConfig.DB_PORT, dbConfig.DB_USER, dbConfig.DB_PASS, dbConfig.DB_NAME, dbConfig.DB_SCHEMA)

	// Open the connection
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error opening database connection:", err)
		return nil, err
	}

	// Ping the database to check the connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
		return nil, err
	}

	return db, nil
}
