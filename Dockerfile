FROM truffle/ci:latest
RUN apt-get update && RUN npm i \
    eslint \
    solium \
    solidity-coverage \
    coveralls \
    ganache-cli
