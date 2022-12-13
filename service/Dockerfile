FROM node:15-alpine
WORKDIR /my-app
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 5000 
CMD ["npm", "start"]
