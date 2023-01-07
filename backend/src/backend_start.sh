#!/bin/sh

# composer update

RUN php artisan config:clear    # Optimizing Configuration loading
RUN php artisan cache:clear     # Optimizing Route loading
RUN php artisan view:cache      # RUN php artisan passport:install

php artisan storage:link

php artisan migrate #--seed

php artisan db:seed UserSeeder
php artisan db:seed TeamSeeder
php artisan db:seed RefereeSeeder
# php artisan db:seed StadiumSeeder

# php artisan l5-swagger:generate

php artisan passport:install --force

php artisan serve --host=0.0.0.0 --port=8181
