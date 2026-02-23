package models

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
