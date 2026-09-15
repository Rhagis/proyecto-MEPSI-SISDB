# Partimos de una imagen oficial y ligera
FROM node:20-alpine

# Creamos una carpeta de trabajo interna
WORKDIR /app

#copiamos solo los archivos de dependencia primero
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["npm", "start"]