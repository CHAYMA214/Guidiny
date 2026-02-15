# 1. Utiliser l'image officielle Node.js
FROM node:20

# 2. Définir le dossier de travail dans le container
WORKDIR /app

# 3. Copier package.json et package-lock.json
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install --legacy-peer-deps


# 5. Copier tout le reste du projet
COPY . .

# 6. Exposer le port que ton app utilise
EXPOSE 3000

# 7. Lancer ton application
CMD ["node", "app.js"]

