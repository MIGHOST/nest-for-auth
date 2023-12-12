FROM node:20-alpine 

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build 

EXPOSE 3001

CMD ["npm", "run", "start:prod"]