FROM truffle/ci:latest

# Create app directory
WORKDIR /usr/src/app \
        COPY package*.json ./ \
        RUN npm install

# Bundle app source
COPY . .
