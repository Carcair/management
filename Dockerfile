FROM node:12

LABEL maintainer="delic.emir90@gmail.com"

WORKDIR /src

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ]