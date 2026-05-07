pipeline {

    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                dir('serverpulse-backend') {
                    sh 'docker build -t serverpulse-backend .'
                }
            }
        }

        stage('Restart Container') {
            steps {
                sh '''
                docker stop serverpulse-api || true
                docker rm serverpulse-api || true

                docker run -d -p 5000:5000 \
                --restart unless-stopped \
                --name serverpulse-api \
                --env-file /opt/serverpulse/.env \
                serverpulse-backend
                '''
            }
        }
    }
}