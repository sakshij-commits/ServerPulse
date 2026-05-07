pipeline {

    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/sakshij-commits/ServerPulse.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t serverpulse-backend ./serverpulse-backend'
            }
        }

        stage('Restart Container') {
            steps {
                sh '''
                docker stop serverpulse-api || true
                docker rm serverpulse-api || true

                docker run -d -p 5000:5000 \
                --name serverpulse-api \
                --env-file ./serverpulse-backend/.env \
                serverpulse-backend
                '''
            }
        }
    }
}