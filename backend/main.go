package main

import (
	"fmt"
	"net/http"
	"os"

	"backend/config"
	"backend/models"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database
	db := config.InitDB()

	// Auto Migrate the schema using the structs from the models package
	db.AutoMigrate(&models.Project{}, &models.User{})

	r := gin.Default()

	// Ensure upload directories exist
	os.MkdirAll("./uploads/images", os.ModePerm)
	os.MkdirAll("./uploads/files", os.ModePerm)

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Allow Next.js frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Serve static files from the uploads directory
	r.Static("/uploads", "./uploads")

	// Health check endpoint at root
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "Uchiha Backend Server is running!",
		})
	})

	// Setup application routes
	routes.SetupRoutes(r)

	fmt.Println("🚀 Uchiha Backend Server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		fmt.Printf("Startup failed: %v\n", err)
	}
}
