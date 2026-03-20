pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/CHAYMA214/Guidiny.git',
                    branch: 'chayma'
            }
        }

        stage('Setup env') {
            steps {
                sh 'cp /var/jenkins_home/workspace/.env .env || true'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}