## Project setup
```
npm install
npm i react-scripts
```

### Run
```
node service/index.js
```
### Run the System
```
docker-compose up
```
Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```
docker-compose up -d
```

### Stop the System
Stopping all the running containers is also simple with a single command:
```
docker-compose down
```
If you need to stop and remove all containers, networks, and all images used by any service in docker-compose.yml file, use the command:
```
docker-compose down --rmi all
```