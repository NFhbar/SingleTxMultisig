const SingleMultisig = artifacts.require('SingleMultiSig')
const TokenMock = artifacts.require('mocks/StandardTokenMock.sol')

contract('SingleMultisig - Receive ETH and Token', accounts => {

    //Variables
    let singlemultisig
    const owners = [accounts[0], accounts[1], accounts[2]]
    const required = 2
    const value = 100
    const zero = 0

    beforeEach(async () => {
        singlemultisig = await SingleMultisig.new(owners, required)
        assert.ok(singlemultisig)
    })

    it('allows contract to receive Tokens', async () => {
        const contract_address = singlemultisig.address
        let token = await TokenMock.new(accounts[0], value)
        await token.transfer(contract_address, value)
        let balance1 = await token.balanceOf.call(accounts[0], { from: accounts[0] })
        balance1 = balance1.toNumber()
        let balance2 = await token.balanceOf.call(contract_address, { from: accounts[0] })
        balance2 = balance2.toNumber()
        assert.equal(balance1, zero)
        assert.equal(balance2, value)
    })

})
