FROM node:20-alpine

RUN apk add --no-cache curl busybox-extras

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . . 

EXPOSE 3000

CMD ["node", "server.js"]

