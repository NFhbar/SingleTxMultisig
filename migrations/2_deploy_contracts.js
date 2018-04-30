const SingleMultisig = artifacts.require('./SingleMultiSig.sol')

//Constructor Variables
const owner_1 = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
const owner_2 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
const owner_3 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
const required = 2

module.exports = function(deployer) {
    deployer.deploy(SingleMultisig,[owner_1, owner_2, owner_3], required)
}
