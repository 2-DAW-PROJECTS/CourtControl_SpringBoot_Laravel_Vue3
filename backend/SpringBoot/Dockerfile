# Usar la imagen oficial de JDK 17
FROM openjdk:17-jdk-slim

# Instalar el cliente MySQL desde el repositorio adecuado
RUN apt-get update && apt-get install -y default-mysql-client

# Setear el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR generado
COPY target/*.jar app.jar

# Verificar si el archivo JAR tiene un manifiesto válido
RUN jar tf app.jar | grep META-INF/MANIFEST.MF

# Exponer el puerto 8085 (nuevo puerto)
EXPOSE 8085

# Ejecutar la aplicación con el puerto 8085 especificado
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=8085"]