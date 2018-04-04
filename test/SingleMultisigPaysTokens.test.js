const SingleMultisig = artifacts.require('SingleMultiSig');
const TokenMock = artifacts.require('mocks/TokenMock.sol');
import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert';
import expectThrow from './helpers/expectThrow';
require('./helpers/transactionMined.js');

contract('SingleMultisig - Contract Pays Tokens', accounts => {

  it('Submit tx, pays Tokens, destroys', async () => {
    //deploy contracts
    let singlemultisig;
    const owners = [accounts[0], accounts[1], accounts[2]];
    const required = 2;
    singlemultisig = await SingleMultisig.new(owners, required, { from: accounts[0] });
    const balance = 100;
    let token = await TokenMock.new(accounts[1], balance);

    //sets owner correctly
    const contract_address = await singlemultisig.address;
    assert.equal(await singlemultisig.owner(), singlemultisig.address);

    //send Token to multisig contract
    await token.transfer(contract_address, balance, { from: accounts[1] });
    let multisig_balance = await token.balanceOf(contract_address);
    assert.equal(multisig_balance, balance);
    assert.equal(await token.balanceOf(accounts[1]), 0);

    //Prepare and submit transaction data
    const tx_value = 50;
    const data = token.contract.transfer.getData(accounts[2], tx_value, { from: contract_address });
    await singlemultisig.submitTransaction(token.address, 0, data, { from: accounts[0] });

    //check sender has tx confirmed
    let confirmations = await singlemultisig.getConfirmations(0, { from: accounts[0] });
    assert.equal(accounts[0], confirmations);

    //check number of confirmations (should be 1)
    let confirmationCount = await singlemultisig.getConfirmationCount(0, { from: accounts[0] });
    assert.equal(1,confirmationCount);

    //get tx count
    let txCount = await singlemultisig.transactionCount();
    assert.equal(1,txCount);

    //check tx is not yet confirmed
    let notConfirmed = await singlemultisig.isConfirmed(0);
    assert.equal(notConfirmed, false);

    //cannot add another transaction
    await expectThrow(singlemultisig.submitTransaction(contract_address, 0, data, { from: accounts[0] }));

    //check other owners can confirm
    //await assertRevert(singlemultisig.confirmTransaction(0, { from: accounts[1] }));
    await singlemultisig.confirmTransaction(0, { from: accounts[1] });

    let newConfirmations = await singlemultisig.getConfirmationCount(0, { from: accounts[0] });
    confirmations = await singlemultisig.getConfirmations(0, { from: accounts[0] });
    assert.equal(2,newConfirmations);
    assert.deepEqual([accounts[0], accounts[1]], confirmations);

    //since required confirmations is 2, tx is now confirmed and executed
    const is_confirmed = await singlemultisig.isConfirmed(0);
    assert.equal(is_confirmed, true);

    const contract_balance = await token.balanceOf(contract_address);
    const account_balance = await token.balanceOf(accounts[2]);
    assert.equal(contract_balance, balance - tx_value);
    assert.equal(account_balance, tx_value);

    //cannot submit any more transactions
    await expectThrow(singlemultisig.submitTransaction(contract_address, 0, data, { from: accounts[0] }));

  });
});
