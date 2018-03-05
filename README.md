# Single Transaction Multi Signature Contract

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


## Install
Clone repo to local machine, then:
```
npm install
```
To install truffle
```
npm install -g truffle
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
## License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
