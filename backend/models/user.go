package models

// User represents the admin user entity
type User struct {
	ID            string  `json:"id" gorm:"primaryKey"`
	Username      string  `json:"username" gorm:"unique;not null"`
	Password      string  `json:"password" gorm:"not null"` // Stored as hash
	Email         string  `json:"email" gorm:"unique;not null"`
	Sex           string  `json:"sex"`
	FirstName     string  `json:"firstName"`
	LastName      string  `json:"lastName"`
	Avatar        string  `json:"avatar"`
	EmailVerified bool    `json:"emailVerified" gorm:"default:false"`
	VerifyToken   *string `json:"verifyToken"`
}
