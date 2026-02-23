pipeline {
    agent any

    environment {
        // Define Docker Image & Container parameters
        IMAGE_NAME = 'uchiha-app'
        CONTAINER_NAME = 'uchiha-instance'
        PORT_FRONTEND = '3000'
        PORT_BACKEND = '8080'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the repository
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker Image: ${IMAGE_NAME}:latest"
                    // Note: If your Jenkins agent runs on pure Windows CMD without Git Bash, 
                    // change 'sh' to 'bat' for all docker commands below.
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Clean Old Container') {
            steps {
                script {
                    echo "Stopping and removing any existing container named ${CONTAINER_NAME}..."
                    // Try to stop and remove the old container before deploying the new one
                    // We use || true so the pipeline doesn't fail if the container isn't running
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    """
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                    echo 'Deploying new container...'
                    // Run the container in detached mode (-d)
                    // Mount the persistent project.db volume directly from the Jenkins workspace
                    sh """
                        docker run -d \\
                            -p ${PORT_FRONTEND}:3000 \\
                            -p ${PORT_BACKEND}:8080 \\
                            -v \$(pwd)/project.db:/app/backend/project.db \\
                            --name ${CONTAINER_NAME} \\
                            ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Deployment Successful! Both Frontend and Backend are running.'
        }
        failure {
            echo '❌ Deployment Failed. Please check the Jenkins logs above.'
        }
    }
}
