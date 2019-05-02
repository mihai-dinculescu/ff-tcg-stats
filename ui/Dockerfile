FROM node:latest

RUN npm install -g lerna

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN yarn
RUN lerna bootstrap
RUN lerna link

