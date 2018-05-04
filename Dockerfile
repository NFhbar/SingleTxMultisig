FROM truffle/ci:latest
RUN apt-get update \
    && apt-get install -y ganache-cli \
    && apt-get install -y eslint \
    && apt-get install -y solium \
    && apt-get install -y solidity-coverage \
    && apt-get install -y coveralls
