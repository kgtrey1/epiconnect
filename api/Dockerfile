FROM node:lts-bullseye-slim

LABEL maintainer = "<kgtrey1>"

RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN pip install numpy

USER node

WORKDIR /home/node/app

CMD npm install && npm start