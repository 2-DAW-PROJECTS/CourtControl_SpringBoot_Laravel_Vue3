# Usa una imagen oficial de Node.js como base
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json (si existe) para instalar las dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto donde se ejecutará el servidor Vue
EXPOSE 8081

# Comando para iniciar el servidor de desarrollo Vue
CMD ["npm", "run", "serve"]
