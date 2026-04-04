pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "mern-frontend:jenkins"
        BACKEND_IMAGE  = "mern-backend:jenkins"

        REACT_APP_BACKEND_URL = "http://localhost:5000/api"

        PORT = "5000"
        MONGODB_URL = "mongodb://mongo:27017/taskdb"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Arosh-Upathilak/MERN-DEVOPS.git', branch: 'main'
            }
        }

        stage('Prepare .env') {
            steps {
                script {
                    writeFile file: 'backend/.env', text: """PORT=${PORT}
MONGODB_URL=${MONGODB_URL}
"""

                    writeFile file: 'frontend/.env', text: """REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
"""
                }
            }
        }

        stage('Debug .env (Optional)') {
            steps {
                sh '''
                echo "===== Backend .env ====="
                cat backend/.env

                echo "===== Frontend .env ====="
                cat frontend/.env
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                echo "Building backend image..."
                docker build -t $BACKEND_IMAGE ./backend

                echo "Building frontend image..."
                docker build -t $FRONTEND_IMAGE ./frontend
                '''
            }
        }

        stage('Run with Docker Compose') {
            steps {
                sh '''
                echo "Stopping old containers (if any)..."
                docker compose down || true

                echo "Starting MERN app with docker compose (no build)..."
                docker compose up -d --no-build

                echo "Showing running containers..."
                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}