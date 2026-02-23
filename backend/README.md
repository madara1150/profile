# 🌙 Uchiha Backend - Go & Gin API

This is the backend API for the Uchiha Developer Portfolio, written in Golang using the Gin web framework. It serves the project data and handles uploading mission visuals (images) and confidential documents (files).

## Prerequisites
You **must** install Go to run this backend.

1. Download Go from [https://go.dev/dl/](https://go.dev/dl/) or install it via your package manager (e.g., `choco install golang` on Windows).
2. Restart your terminal to ensure `go` is in your environment PATH.

## Setup Instructions

Once Go is installed, follow these steps:

### 1. Initialize the Module
```bash
# From the backend directory:
go mod init backend
```

### 2. Download Dependencies
```bash
go get -u github.com/gin-gonic/gin
go get -u github.com/gin-contrib/cors
```

### 3. Run the Server
```bash
go run main.go
```

The server will start on port `8080`.

## Endpoints

### Data
- `GET /api/projects`: Fetches the list of all projects.
- `GET /api/projects/:id`: Fetches data for a specific project.

### Uploads
- `POST /api/upload/image`: Uploads an image. Expected FormData key is `file`. File will be saved to `uploads/images/`.
- `POST /api/upload/file`: Uploads a document. Expected FormData key is `file`. File will be saved to `uploads/files/`.

### Static Files
- Uploaded files are publicly accessible at `http://localhost:8080/uploads/images/...` and `http://localhost:8080/uploads/files/...`.
