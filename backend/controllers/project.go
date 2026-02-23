package controllers

import (
	"net/http"

	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetProjects(c *gin.Context) {
	db := config.DB
	var projects []models.Project
	if err := db.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func GetProject(c *gin.Context) {
	db := config.DB
	id := c.Param("id")
	var p models.Project
	if err := db.First(&p, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, p)
}

func CreateProject(c *gin.Context) {
	db := config.DB
	var p models.Project
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
}

func UpdateProject(c *gin.Context) {
	db := config.DB
	id := c.Param("id")
	var p models.Project

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
}

func DeleteProject(c *gin.Context) {
	db := config.DB
	id := c.Param("id")

	if err := db.Where("id = ?", id).Delete(&models.Project{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}
