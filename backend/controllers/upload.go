package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadImage(c *gin.Context) {
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
}

func UploadFile(c *gin.Context) {
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
}
