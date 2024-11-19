#!/bin/bash

# Change to Laravel project directory
cd /var/www/html/laravel

# Generate Laravel key
php artisan key:generate

# Show available routes
php artisan route:list

# Start Apache in foreground
apache2-foreground
