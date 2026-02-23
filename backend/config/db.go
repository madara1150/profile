package config

import (
	"log"

	"github.com/glebarez/sqlite" // Pure Go SQLite driver (No CGO required)
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes the database connection
func InitDB() *gorm.DB {
	var err error

	// Open connection to SQLite database
	DB, err = gorm.Open(sqlite.Open("project.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	log.Println("✅ Database connected successfully")
	return DB
}
