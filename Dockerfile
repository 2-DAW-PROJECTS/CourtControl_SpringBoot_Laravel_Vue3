FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo_mysql

RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/backend/laravel

# Copia los archivos en la carpeta laravel
COPY ./backend/laravel /var/www/html/backend/laravel
COPY --chown=www-data:www-data ./backend/laravel /var/www/html/laravel

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install

COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

CMD ["apache2-foreground"]
