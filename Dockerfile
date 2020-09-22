FROM node:12

LABEL maintainer="delic.emir90@gmail.com"

WORKDIR /src
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "src/app.js" ]