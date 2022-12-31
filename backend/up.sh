#!/bin/bash

docker-compose --env-file ./src/.env up --build --remove-orphans --force-recreate


