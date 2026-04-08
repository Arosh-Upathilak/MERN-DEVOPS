pipeline {
    agent any


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
    }
}