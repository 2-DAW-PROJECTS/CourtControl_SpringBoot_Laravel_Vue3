#!/bin/bash
cd /var/www/html

php artisan key:generate

php artisan migrate

php artisan serve --host=0.0.0.0 --port=8000 & apache2-foreground