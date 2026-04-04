pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "mern-frontend:jenkins"
        REACT_APP_BACKEND_URL = "http://localhost:5000/api"
        BACKEND_IMAGE = "mern-backend:jenkins"
        PORT = "5000"
        MONGODB_URL = "mongodb://mongo:27017/taskdb"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Arosh-Upathilak/DEVOPS.git', branch: 'main'
            }
        }

        stage('Prepare .env') {
            steps {
                sh '''
                mkdir -p backend
                mkdir -p frontend

                cat > backend/.env <<EOF
                PORT=$PORT
                MONGODB_URL=$MONGODB_URL
                EOF

                cat > frontend/.env <<EOF
                REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
                EOF
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
                echo "Starting MERN app with docker compose..."
                docker compose up -d

                echo "Showing running containers"
                docker ps
                '''
            }
        }
    }
}