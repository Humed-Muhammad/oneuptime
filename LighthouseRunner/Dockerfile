#
# LighthouseRunner Dockerfile
#

# Pull base image nodejs image.
FROM node:alpine

# Install bash. 
RUN apk update && apk add bash && apk add curl

#Use bash shell by default
SHELL ["/bin/bash", "-c"]
RUN npm install typescript -g

RUN mkdir /usr/src

# Install common
RUN mkdir /usr/src/Common
WORKDIR /usr/src/Common
COPY ./Common/package*.json /usr/src/Common/
RUN npm install
COPY ./Common /usr/src/Common
RUN npm run compile

# Install Model
RUN mkdir /usr/src/Model
WORKDIR /usr/src/Model
COPY ./Model/package*.json /usr/src/Model/
RUN npm install
COPY ./Model /usr/src/Model
RUN npm run compile

# Install CommonServer
RUN mkdir /usr/src/CommonServer
WORKDIR /usr/src/CommonServer
COPY ./CommonServer/package*.json /usr/src/CommonServer/
RUN npm install
COPY ./CommonServer /usr/src/CommonServer
RUN npm run compile


#SET ENV Variables
ENV PRODUCTION=true
ENV CHROME_PATH=/usr/bin/chromium

# Install Chrome.
RUN apk add curl chromium

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY ./LighthouseRunner/package*.json /usr/src/app/
RUN npm install
RUN npm install -g ts-node
RUN npm install -g ts-node-dev

# Bundle app source
COPY ./LighthouseRunner /usr/src/app

# Expose ports.
#   - 3015: Lighthouse Runner
EXPOSE 3015

#Run the app
RUN npm run compile
CMD [ "npm", "start"]
