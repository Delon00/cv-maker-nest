# Utilise l'image Node officielle (version correspondant à la tienne)
FROM node:22

# Crée le dossier de l'application dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Génère le client Prisma (indispensable car l'OS du conteneur est Linux)
RUN npx prisma generate

# Expose le port de NestJS
EXPOSE 3000

# Commande de démarrage (en mode dev pour le hot-reload)
CMD [  "npm", "run", "start:dev" ]