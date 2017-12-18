FROM node:carbon
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass --force
# If you are building your code for production
# RUN npm install --only=production

COPY . .

CMD [ "npm", "run","start-dev" ]
