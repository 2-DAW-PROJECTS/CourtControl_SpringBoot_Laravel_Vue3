FROM php:8.1-apache

# Install system dependencies
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

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install Laravel dependencies
RUN composer install

# Copy Apache config
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expose port 8000 for Laravel
EXPOSE 8000

# Set the ServerName directive globally to suppress the warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Run the start script
CMD ["apache2-foreground"]