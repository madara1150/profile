package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// ProjectFile represents a downloadable file or document
type ProjectFile struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

// Project represents the main project entity matching the frontend TypeScript interface
type Project struct {
	ID           string        `json:"id"`
	Title        string        `json:"title"`
	Desc         string        `json:"desc"`
	Tags         []string      `json:"tags"`
	Images       []string      `json:"images"`
	Location     string        `json:"location"`
	Time         string        `json:"time"`
	ReferenceURL string        `json:"referenceUrl"`
	Files        []ProjectFile `json:"files"`
}

// In-memory mock database
var projects = []Project{
	{
		ID:           "p1",
		Title:        "S-Rank E-Commerce",
		Desc:         "A highly optimized full-stack storefront featuring 3D product configurators.",
		Tags:         []string{"Next.js", "Three.js", "Tailwind"},
		Images:       []string{"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"},
		Location:     "Konohagakure",
		Time:         "Q3 2023",
		ReferenceURL: "https://example.com/s-rank-ecommerce",
		Files: []ProjectFile{
			{Name: "Architecture Diagram.pdf", URL: "#"},
			{Name: "API Spec.md", URL: "#"},
		},
	},
	{
		ID:           "p2",
		Title:        "Chakra Analytics",
		Desc:         "Blazing fast real-time dashboard powered by WebSockets.",
		Tags:         []string{"Golang", "React", "PostgreSQL"},
		Images:       []string{"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"},
		Location:     "Sunagakure",
		Time:         "Q4 2023",
		ReferenceURL: "https://example.com/chakra-analytics",
		Files: []ProjectFile{
			{Name: "Database Schema.sql", URL: "#"},
		},
	},
}

func main() {
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
	// e.g., http://localhost:8080/uploads/images/filename.png
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

		// GET /api/projects - Returns all projects
		api.GET("/projects", func(c *gin.Context) {
			c.JSON(http.StatusOK, projects)
		})

		// GET /api/projects/:id - Returns a single project by ID
		api.GET("/projects/:id", func(c *gin.Context) {
			id := c.Param("id")
			for _, p := range projects {
				if p.ID == id {
					c.JSON(http.StatusOK, p)
					return
				}
			}
			c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		})

		// ---- Upload endpoints ----

		// POST /api/upload/image - Handle image uploads
		api.POST("/upload/image", func(c *gin.Context) {
			file, err := c.FormFile("file")
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded or invalid form-data key 'file'"})
				return
			}

			// Save the file
			filename := filepath.Base(file.Filename)
			uploadPath := fmt.Sprintf("./uploads/images/%s", filename)
			if err := c.SaveUploadedFile(file, uploadPath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			// Return the accessible URL
			fileURL := fmt.Sprintf("http://localhost:8080/uploads/images/%s", filename)
			c.JSON(http.StatusOK, gin.H{
				"message": "Image uploaded successfully",
				"url":     fileURL,
				"name":    filename,
			})
		})

		// POST /api/upload/file - Handle generic file uploads (PDFs, Source code)
		api.POST("/upload/file", func(c *gin.Context) {
			file, err := c.FormFile("file")
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded or invalid form-data key 'file'"})
				return
			}

			// Save the file
			filename := filepath.Base(file.Filename)
			uploadPath := fmt.Sprintf("./uploads/files/%s", filename)
			if err := c.SaveUploadedFile(file, uploadPath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			// Return the accessible URL
			fileURL := fmt.Sprintf("http://localhost:8080/uploads/files/%s", filename)
			c.JSON(http.StatusOK, gin.H{
				"message": "File uploaded successfully",
				"url":     fileURL,
				"name":    filename,
			})
		})
	}

	fmt.Println("🚀 Uchiha Backend Server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		fmt.Printf("Startup failed: %v\n", err)
	}
}
