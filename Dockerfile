FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo_mysql

RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY ./src /var/www/html
COPY --chown=www-data:www-data ./src /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN cd /var/www/html/1_helloworld && composer install

COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

CMD ["apache2-foreground"]

