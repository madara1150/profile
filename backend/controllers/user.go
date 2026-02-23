package controllers

import (
	"net/http"

	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	db := config.DB
	var users []models.User
	// Exclude password from the query results
	if err := db.Select("id", "username", "email", "sex", "first_name", "last_name", "avatar").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
	db := config.DB
	id := c.Param("id")
	var user models.User
	if err := db.Select("id", "username", "email", "sex", "first_name", "last_name", "avatar").First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
	db := config.DB
	id := c.Param("id")
	var user models.User
	var input struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Email     string `json:"email"`
		Sex       string `json:"sex"`
		Avatar    string `json:"avatar"`
	}

	// Check if exists
	if err := db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update only allowed fields
	if input.FirstName != "" {
		user.FirstName = input.FirstName
	}
	if input.LastName != "" {
		user.LastName = input.LastName
	}
	if input.Email != "" {
		user.Email = input.Email
	}
	if input.Sex != "" {
		user.Sex = input.Sex
	}
	// Avatar blindly copied string
	user.Avatar = input.Avatar

	// Save updates back to DB
	if err := db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	// Blank out password before returning
	user.Password = ""
	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	db := config.DB
	id := c.Param("id")

	if err := db.Where("id = ?", id).Delete(&models.User{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
