FROM node:lts-bullseye-slim

LABEL maintainer = "<kgtrey1>"

RUN npm install -g expo-cli

USER node

WORKDIR /home/node/app

CMD yarn install && yarn start