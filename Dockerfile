
FROM node:14.4.0-alpine3.12

RUN mkdir /opt/app

COPY dist /opt/app/
COPY package.json /opt/app/
COPY npm-shrinkwrap.json /opt/app/

WORKDIR /opt/app
RUN npm ci

EXPOSE 3000

CMD [ "node", "index.js" ]
