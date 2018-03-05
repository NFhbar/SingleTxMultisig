const SingleMultisig = artifacts.require('SingleMultiSig');

contract('SingleMultisig - Receive ETH', accounts => {

  //Variables
  let singlemultisig;
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 2;

  beforeEach(async () => {
    singlemultisig = await SingleMultisig.new(owners, required);
    assert.ok(singlemultisig);
  });

  it('allows contract to receive ETH', async () => {
    const contract_address = singlemultisig.address;

     await web3.eth.sendTransaction({
      from: accounts[0],
      to: contract_address,
      value: 100,
      gas: 1000000
    });

    const balance = web3.eth.getBalance(contract_address);
    assert(balance,100);

  });
});
