# Gebruik een lichte Node.js-afbeelding
FROM node:18-alpine

# Stel de werkdirectory in
WORKDIR /app

# Kopieer package.json en package-lock.json
COPY package*.json ./

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de app
COPY . .

# Exposeer de poort waarop Vite draait
EXPOSE ${FRONTEND_PORT:-5173}

# Start de applicatie
CMD ["npm", "run", "dev"]
