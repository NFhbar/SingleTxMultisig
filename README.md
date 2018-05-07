# Single Transaction Multi Signature Contract

<div>

[![Build Status](https://travis-ci.org/NFhbar/SingleTxMultisig.png?branch=master)](https://travis-ci.org/NFhbar/SingleTxMultisig)
[![Coverage Status](https://coveralls.io/repos/github/NFhbar/SingleTxMultisig/badge.svg?branch=master)](https://coveralls.io/github/NFhbar/SingleTxMultisig?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/nicolas-frega/projects/ff951f47-780c-48d0-af12-330754a60afa/badge)](https://nodesecurity.io/orgs/nicolas-frega/projects/ff951f47-780c-48d0-af12-330754a60afa)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/NFhbar/SingleTxMultisig/issues)

</div>

## Description
A single transaction multi signature contract based on: [Gnosis Multisig](https://github.com/gnosis/MultiSigWallet).
This version includes the modifier:
```    
modifier onlyOneTransaction() {
      require(transactionCount == 0);
      _;

    }
```
which allows for only one transaction. After that the contract is rendered unusable.

Useful for simple transactions in which parties part ways after execution.

## Install
### ethpm
```
$ truffle install single-tx-multisig@2.2.1
```

### Clone
Clone repo:
```
git clone git@github.com:NFhbar/SingleTxMultisig.git
```

Create a new ```.env``` file in root directory and add your private key:
```
RINKEBY_PRIVATE_KEY="MyPrivateKeyHere..."
```
If you don't have a private key, you can use one provided by Ganache (for development only!):
```
RINKEBY_PRIVATE_KEY="c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
```
then:
```
npm install
```
To enter Truffle:
```
truffle develop
```
To compile:
```
truffle(develop)> compile
```
To migrate:
```
truffle(develop)> migrate
```
To test:
```
truffle(develop)> test
```
or
```
npm run test
```

## Coverage Analysis
### Solidity Coverage
To run [Solidity Coverage reports](https://github.com/sc-forks/solidity-coverage):
```
$ npm run coverage
```
Keep in mind solidity-coverage now expects a globally installed truffle.
Coverage report available [here](https://github.com/NFhbar/SingleTxMultisig/blob/master/coverage).

## Docker
Docker image [here](https://hub.docker.com/r/nfhbar/singletxmultisig/).

## Issues/Bugs
### Wrong Contract Address
When migrating
```
Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc13a92c0a6da92698644c0 is not a contract address
```
Solution: delete contents of /build/contracts and recompile.

### Not Enough Funds during test
When testing in truffle develop
```
Error: sender doesn't have enough funds to send tx.
```
Solution: restart truffle develop.

Notes: truffle does not reset accounts balance on multiple runs.

### Solidity Coverage testrpc ghost process
After running solidity-coverage, testrpc remains a ghost process.

Solution: kill it with:
```
$ npm run stop
```
and run coverage again:
```
$ npm run coverage
```

## License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
