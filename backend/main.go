package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"backend/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// ProjectFile represents a downloadable file or document
type ProjectFile struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

// Project represents the main project entity matching the frontend TypeScript interface
type Project struct {
	ID           string        `json:"id" gorm:"primaryKey"`
	Title        string        `json:"title"`
	Desc         string        `json:"desc"`
	Tags         []string      `json:"tags" gorm:"serializer:json"`
	Images       []string      `json:"images" gorm:"serializer:json"`
	Location     string        `json:"location"`
	Time         string        `json:"time"`
	ReferenceURL string        `json:"referenceUrl"`
	Files        []ProjectFile `json:"files" gorm:"serializer:json"`
}

func main() {
	// Initialize Database
	db := config.InitDB()

	// Auto Migrate the schema
	db.AutoMigrate(&Project{})

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

	// API Group
	api := r.Group("/api")
	{
		// ---- Projects endpoints ----

		// GET /api/projects - Returns all projects from DB
		api.GET("/projects", func(c *gin.Context) {
			var projects []Project
			if err := db.Find(&projects).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
				return
			}
			c.JSON(http.StatusOK, projects)
		})

		// GET /api/projects/:id - Returns a single project by ID
		api.GET("/projects/:id", func(c *gin.Context) {
			id := c.Param("id")
			var p Project
			if err := db.First(&p, "id = ?", id).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
				return
			}
			c.JSON(http.StatusOK, p)
		})

		// POST /api/projects - Create a new project
		api.POST("/projects", func(c *gin.Context) {
			var p Project
			if err := c.ShouldBindJSON(&p); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			p.ID = uuid.New().String() // Assign a new UUID

			if err := db.Create(&p).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
				return
			}
			c.JSON(http.StatusOK, p)
		})

		// PUT /api/projects/:id - Update an existing project
		api.PUT("/projects/:id", func(c *gin.Context) {
			id := c.Param("id")
			var p Project

			// Check if exists
			if err := db.First(&p, "id = ?", id).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
				return
			}

			// Bind incoming JSON to the existing struct
			if err := c.ShouldBindJSON(&p); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			// Save updates back to DB
			if err := db.Save(&p).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
				return
			}

			c.JSON(http.StatusOK, p)
		})

		// DELETE /api/projects/:id - Delete a project
		api.DELETE("/projects/:id", func(c *gin.Context) {
			id := c.Param("id")

			// Unscoped hard delete, or you could do soft delete if preferred
			if err := db.Where("id = ?", id).Delete(&Project{}).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
		})

		// ---- Upload endpoints ----

		// POST /api/upload/image - Handle image uploads
		api.POST("/upload/image", func(c *gin.Context) {
			file, err := c.FormFile("file")
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded or invalid form-data key 'file'"})
				return
			}

			filename := filepath.Base(file.Filename)
			// Ensure unique filename by prepending UUID to avoid collisions
			uniqueFilename := uuid.New().String() + "-" + filename
			uploadPath := fmt.Sprintf("./uploads/images/%s", uniqueFilename)

			if err := c.SaveUploadedFile(file, uploadPath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			fileURL := fmt.Sprintf("http://localhost:8080/uploads/images/%s", uniqueFilename)
			c.JSON(http.StatusOK, gin.H{
				"message": "Image uploaded successfully",
				"url":     fileURL,
				"name":    uniqueFilename,
			})
		})

		// POST /api/upload/file - Handle generic file uploads
		api.POST("/upload/file", func(c *gin.Context) {
			file, err := c.FormFile("file")
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded or invalid form-data key 'file'"})
				return
			}

			filename := filepath.Base(file.Filename)
			uniqueFilename := uuid.New().String() + "-" + filename
			uploadPath := fmt.Sprintf("./uploads/files/%s", uniqueFilename)

			if err := c.SaveUploadedFile(file, uploadPath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			fileURL := fmt.Sprintf("http://localhost:8080/uploads/files/%s", uniqueFilename)
			c.JSON(http.StatusOK, gin.H{
				"message": "File uploaded successfully",
				"url":     fileURL,
				"name":    uniqueFilename,
			})
		})
	}

	fmt.Println("🚀 Uchiha Backend Server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		fmt.Printf("Startup failed: %v\n", err)
	}
}
