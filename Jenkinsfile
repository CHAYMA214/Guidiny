pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/CHAYMA214/Guidiny.git',
                    branch: 'server'
            }
        }

        stage('Build & Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'MONGO_USERNAME', variable: 'MONGO_USERNAME'),
                    string(credentialsId: 'MONGO_PASSWORD', variable: 'MONGO_PASSWORD'),
                    string(credentialsId: 'MONGO_DB', variable: 'MONGO_DB'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'NODE_ENV', variable: 'NODE_ENV'),
                    string(credentialsId: 'GOOGLE_CLIENT_ID', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                ]) {
                    sh '''
                        export NODE_ENV=$NODE_ENV
                        export MONGO_URL=$MONGO_URL
                        export MONGO_USERNAME=$MONGO_USERNAME
                        export MONGO_PASSWORD=$MONGO_PASSWORD
                        export MONGO_DB=$MONGO_DB
                        export JWT_SECRET=$JWT_SECRET
                        export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

                        docker-compose down --remove-orphans || true
                        docker-compose build
                        docker-compose up -d
                    '''
                }
            }
        }
    }

    post {
        success { echo '✅ Deployed successfully!' }
        failure { echo '❌ Pipeline failed!' }
    }
}
