FROM php:8.1-apache

RUN apt-get update -y && \
    apt-get install -y \
        g++ vim openssl zip unzip git software-properties-common ffmpeg \
        zlib1g-dev libpng-dev libpq-dev libwebp-dev libxpm-dev \
        libcurl4-openssl-dev libxml2-dev libonig-dev \
        libjpeg-dev libfreetype6-dev libfreetype6-dev libjpeg62-turbo-dev

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pgsql pdo pdo_pgsql curl xml mbstring

# install php-gd extension
RUN docker-php-ext-configure gd --with-jpeg --with-freetype

RUN docker-php-ext-install gd

# clean up the installion process
RUN apt-get -y autoremove \
    && apt-get autoclean -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# copy the custom php.ini file to the docker image
ADD ./custom-php.ini /usr/local/etc/php/conf.d/custom-php.ini

# create a working directory
WORKDIR /backend/src

# copy the project files to that directory
COPY ./src /backend/src

# install needed packages
RUN composer install
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN php artisan config:clear    # Optimizing Configuration loading
RUN php artisan cache:clear     # Optimizing Route loading
RUN php artisan view:cache      # RUN php artisan passport:install

# this one contains a patch for some non-working functionality in the original one
# COPY ./BroadcastNotificationCreated.php /backend/vendor/laravel/framework/src/Illuminate/Notifications/Events/BroadcastNotificationCreated.php
# COPY ./RefreshDatabase.php /backend/vendor/laravel/framework/src/Illuminate/Foundation/Testing/RefreshDatabase.php

EXPOSE 8181

RUN chmod +x backend_start.sh

CMD ./backend_start.sh

