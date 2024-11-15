#!/bin/bash

# Cambiar al directorio del proyecto Laravel
cd /var/www/html/1_helloworld

# Generar la clave de Laravel si es necesario
php artisan key:generate

# Mostrar las rutas disponibles
php artisan route:list

# Iniciar el servidor Laravel
php artisan serve --host=0.0.0.0 --port=8000
