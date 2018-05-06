FROM node:carbon

# Install global dependencies
RUN npm install -g truffle
RUN npm install -g ganache-cli

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

## Run eslint
RUN npm run lint

## Run ganache and tests
RUN npm run ganache \
    && sleep 5 \
    && truffle migrate \
    && truffle test
