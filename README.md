

# CourtControl

### "Precisión en cada jugada, control en cada espacio."

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3/)

## Descripción
CourtControl es una aplicación avanzada diseñada para optimizar la administración de polideportivos, ofreciendo una solución integral para la gestión de instalaciones deportivas, reservas y recursos.

## Características Principales
- **Gestión de Reservas:** Administra canchas y espacios deportivos de manera eficiente.
- **Control de Horarios:** Monitorea la disponibilidad y horarios de las instalaciones.
- **Administración de Usuarios:** Gestiona usuarios y membresías con facilidad.
- **Mantenimiento de Instalaciones:** Realiza un seguimiento detallado del mantenimiento.
- **Sistema de Pagos:** Integra pagos y facturación de manera segura.
- **Reportes y Estadísticas:** Genera informes detallados y estadísticas útiles.

## Tecnologías Utilizadas
- **Frontend:** Vue3.js
- **Backend:** Laravel, Spring Boot
- **Base de Datos:** SQL
- **Autenticación:** JWT

## Contribución
Las contribuciones son bienvenidas. Por favor, lee el archivo [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Instalación y Configuración

### Prerrequisitos
- Node.js
- npm
- Composer
- Java JDK
- Maven
- MySQL

### Instalación del Frontend (Vue3)
1. Clona el repositorio:
    ```bash
    git clone https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3.git
    ```
2. Navega al directorio del frontend:
    ```bash
    cd CourtControl_SpringBoot_Laravel_Vue3/frontend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia la aplicación:
    ```bash
    npm run serve
    ```

### Instalación del Backend (Laravel)
1. Navega al directorio del backend Laravel:
    ```bash
    cd CourtControl_SpringBoot_Laravel_Vue3/backend/laravel
    ```
2. Instala las dependencias:
    ```bash
    composer install
    ```
3. Configura el archivo `.env`:
    ```bash
    cp .env.example .env
    ```
4. Genera la clave de la aplicación:
    ```bash
    php artisan key:generate
    ```
5. Ejecuta las migraciones:
    ```bash
    php artisan migrate
    ```
6. Inicia el servidor:
    ```bash
    php artisan serve
    ```

### Instalación del Backend (Spring Boot)
1. Navega al directorio del backend Spring Boot:
    ```bash
    cd CourtControl_SpringBoot_Laravel_Vue3/backend/springboot
    ```
2. Compila el proyecto:
    ```bash
    mvn clean install
    ```
3. Inicia la aplicación:
    ```bash
    mvn spring-boot:run
    ```

## Uso
Una vez que todos los servicios estén en funcionamiento, puedes acceder a la aplicación a través de `http://localhost:8080` para el frontend y los endpoints de la API estarán disponibles en `http://localhost:8000` para Laravel y `http://localhost:8081` para Spring Boot.

## Contacto
Para cualquier consulta o soporte, por favor contacta a los mantenedores del proyecto a través del repositorio de GitHub.





