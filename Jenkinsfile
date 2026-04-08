pipeline {
    agent any

    /*parameters {
        string(name: 'FRONTEND_IMAGE', defaultValue: 'mern-frontend:jenkins', description: 'Frontend image')
        string(name: 'BACKEND_IMAGE', defaultValue: 'mern-backend:jenkins', description: 'Backend image')
    }*/

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Arosh-Upathilak/MERN-DEVOPS.git', branch: 'main'
            }
        }

        stage('Prepare .env and check other secret') {
            steps {
                withCredentials([
                    string(credentialsId: 'mongo-uri', variable: 'MONGODB_URL'),
                    string(credentialsId: 'port', variable: 'PORT')
                ]) {
                    script {
                        writeFile file: 'backend/.env', text: """PORT=${PORT}
MONGODB_URL=${MONGODB_URL}
"""
                    }
                }

                sh """
                echo "Checking parameters"
                echo "FRONTEND_IMAGE = ${params.FRONTEND_IMAGE}"
                echo "BACKEND_IMAGE = ${params.BACKEND_IMAGE}"
                """
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                echo "Building backend image"
                docker build -t ${params.BACKEND_IMAGE} ./backend

                echo "Building frontend image"
                docker build -t ${params.FRONTEND_IMAGE} \\
                  --build-arg REACT_APP_BACKEND_URL=/api \\
                  ./frontend
                """
            }
        }

        stage('Docker compose Up'){
            steps{
                sh'''
                echo "Stopping old containers (if any)..."
                docker compose down || true

                echo "Starting MERN app..."
                docker compose up -d --build

                '''
            }
        }
    }

    post{
        success{
            echo "Pipeline completed successfully!"
        }
        failure{
            echo "Pipeline failed!"
        }
    }
}