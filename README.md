# CourtControl

### "Precisión en cada jugada, control en cada espacio."

## Descripción
CourtControl es una aplicación diseñada para optimizar la administración de polideportivos, ofreciendo una solución integral para la gestión de instalaciones deportivas, reservas y recursos.

## Características Principales
- Gestión de reservas de canchas y espacios deportivos
- Control de horarios y disponibilidad
- Administración de usuarios y membresías
- Seguimiento de mantenimiento de instalaciones
- Sistema de pagos y facturación
- Reportes y estadísticas
- Notificaciones automáticas para recordatorios de reservas
- Integración con calendarios externos (Google Calendar, Outlook)
- Soporte multilingüe
- Interfaz de usuario intuitiva y adaptable a dispositivos móviles

## Tecnologías Utilizadas
- **Frontend:** Vue3.js
- **Backend:** Laravel, Spring Boot
- **Base de Datos:** SQL
- **Autenticación:** JWT
- **Despliegue:** Docker, Kubernetes
- **Pruebas:** PHPUnit, JUnit
- **CI/CD:** GitHub Actions

## Instalación
Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd CourtControl_SpringBoot_Laravel_Vue3
    ```

3. Configura las variables de entorno para Laravel y Spring Boot.

4. Instala las dependencias del frontend:
    ```bash
    cd frontend
    npm install
    ```

5. Instala las dependencias del backend (Laravel):
    ```bash
    cd backend/laravel
    composer install
    ```

6. Instala las dependencias del backend (Spring Boot):
    ```bash
    cd backend/springboot
    mvn install
    ```

7. Inicia los servidores de desarrollo:
    - Frontend:
      ```bash
      npm run serve
      ```
    - Backend (Laravel):
      ```bash
      php artisan serve
      ```
    - Backend (Spring Boot):
      ```bash
      mvn spring-boot:run
      ```

## Uso
Una vez que los servidores estén en funcionamiento, puedes acceder a la aplicación en tu navegador web en `http://localhost:8080` (o el puerto configurado).

## Contribución
Las contribuciones son bienvenidas. Por favor, lee el archivo CONTRIBUTING.md para más detalles.

## Creadores
- [2-DAW-PROJECTS](https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3)
- [JavierTomasTormo](https://github.com/JavierTomasTormo)
- [alfosan](https://github.com/alfosan)

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.

## Enlaces de Interés
- [Repositorio del Proyecto](https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3)
- [Documentación Oficial de Vue.js](https://vuejs.org/)
- [Documentación Oficial de Laravel](https://laravel.com/docs)
- [Documentación Oficial de Spring Boot](https://spring.io/projects/spring-boot)

