FROM truffle/ci:latest
RUN apt-get update && npm install \
    eslint \
    solium \
    solidity-coverage \
    coveralls \
    ganache-cli
