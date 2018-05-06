FROM node:carbon

# Install global dependencies
RUN npm install -g truffle
RUN npm install -g ganache-cli

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
