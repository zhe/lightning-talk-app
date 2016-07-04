FROM node:6.2.2

MAINTAINER Zhe Zhang https://github.com/zhe

RUN mkdir -p /app

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3001

CMD ['node', 'server/server.js']
