FROM node:18-alpine

RUN apk update && apk add git autoconf make automake pkgconfig libtool g++ libjpeg-turbo-dev libpng-dev nasm build-base

WORKDIR /app

CMD ["node", "./example/index.js"]
