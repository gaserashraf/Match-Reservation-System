#!/bin/sh

composer update

php artisan storage:link

php artisan migrate #--seed

php artisan db:seed UserSeeder
php artisan db:seed TeamSeeder
php artisan db:seed RefereeSeeder

# php artisan l5-swagger:generate

php artisan passport:install --force

php artisan serve --host=0.0.0.0 --port=8181
