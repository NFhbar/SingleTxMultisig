FROM node:carbon

## Wait for truffle publish fix for:
# Error: Could not connect to the following networks: ganache, coverage.
# These networks have deployed artifacts that can't be published as a
# package without an active and accessible connection. Please ensure clients
# for each network are up and running prior to publishing, or use the -n option
#  to specify specific networks you'd like published.
## THEN INCLUDE THIS

# RUN npm install -g truffle
#
# WORKDIR /usr/src/app
#
# RUN truffle init
#
# RUN truffle install single-tx-multisig@$PACKAGE_VERSION

RUN npm install -g truffle

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
