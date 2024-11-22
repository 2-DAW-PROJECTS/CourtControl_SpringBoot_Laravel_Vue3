FROM node:18

WORKDIR /app

# Copia solo el package.json si no usas yarn
COPY package.json . 

# Instala las dependencias usando npm
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto y ejecuta la aplicación
EXPOSE 3000
CMD ["npm", "start"]
