package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes registers all the application routes
func SetupRoutes(r *gin.Engine) {

	api := r.Group("/api")
	{
		// ---- Auth endpoints ----
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.Register)
			auth.POST("/login", controllers.Login)
		}

		// ---- Users endpoints ----
		users := api.Group("/users")
		// Apply AuthMiddleware to all /users routes
		users.Use(middleware.AuthMiddleware())
		{
			users.GET("", controllers.GetUsers)
			users.GET("/:id", controllers.GetUser)
			users.PUT("/:id", controllers.UpdateUser)
			users.DELETE("/:id", controllers.DeleteUser)
		}

		// ---- Projects endpoints ----
		projects := api.Group("/projects")
		{
			// Public routes
			projects.GET("", controllers.GetProjects)
			projects.GET("/:id", controllers.GetProject)

			// Protected routes
			protectedProjects := projects.Group("")
			protectedProjects.Use(middleware.AuthMiddleware())
			{
				protectedProjects.POST("", controllers.CreateProject)
				protectedProjects.PUT("/:id", controllers.UpdateProject)
				protectedProjects.DELETE("/:id", controllers.DeleteProject)
			}
		}

		// ---- Upload endpoints ----
		uploads := api.Group("/upload")
		{
			uploads.POST("/image", controllers.UploadImage)
			uploads.POST("/file", controllers.UploadFile)
		}
	}
}
