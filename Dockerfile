FROM node:lts-bullseye-slim

WORKDIR /app

RUN node --version

RUN npm install pm2 dotenv-cli -g
