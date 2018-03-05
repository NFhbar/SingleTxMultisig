const SingleMultisig = artifacts.require('SingleMultiSig');
const TokenMock = artifacts.require('mocks/TokenMock.sol');

contract('SingleMultisig - Receive ETH and Token', accounts => {

  //Variables
  let singlemultisig;
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 2;

  beforeEach(async () => {
    singlemultisig = await SingleMultisig.new(owners, required);
    assert.ok(singlemultisig);
  });

  it('allows contract to receive Tokens', async () => {
    const contract_address = singlemultisig.address;
    let token = await TokenMock.new(accounts[0], 100);
    await token.transfer(contract_address, 100);
    let balance0 = await token.balanceOf(accounts[0]);
    assert.equal(balance0, 0);

    let balance1 = await token.balanceOf(contract_address);
    assert.equal(balance1, 100);
  });

});
