FROM node:20-alpine

# Install libraries needed for Baileys/Puppeteer if necessary, though Baileys is websocket based.
# Simple Baileys usually just needs Node.js.

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
