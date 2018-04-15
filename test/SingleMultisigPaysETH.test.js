const SingleMultisig = artifacts.require('SingleMultiSig')
import expectThrow from './helpers/expectThrow'

contract('SingleMultisig - Contract Pays ETH', accounts => {

  it('Submit tx, pays ETH, destroys', async () => {
    //Variables
    let singlemultisig
    const owners = [accounts[0], accounts[1], accounts[2]]
    const required = 2
    let original_balance = web3.eth.getBalance(accounts[2])

    //deploy
    singlemultisig = await SingleMultisig.new(owners, required, { from: accounts[0] })

    //sets owner correctly
    assert.equal(await singlemultisig.owner(), singlemultisig.address)

    //send ETH to contract
    let value = 100
    const data=""
    await web3.eth.sendTransaction({
       from: accounts[0],
       to: singlemultisig.address,
       value: value,
       gas: 1000000
     })
    assert.equal(web3.eth.getBalance(singlemultisig.address),value)

    //Submit transaction
    await singlemultisig.submitTransaction(accounts[2], value, "", {from: accounts[0]})

    //check sender has tx confirmed
    let confirmations = await singlemultisig.getConfirmations(0, { from: accounts[0] })
    assert.equal(accounts[0], confirmations)

    //check number of confirmations (should be 1)
    confirmations = await singlemultisig.getConfirmationCount(0, { from: accounts[0] })
    assert.equal(1,confirmations)

    //get tx count
    let txCount = await singlemultisig.transactionCount()
    assert.equal(1,txCount)

    //check tx is not yet confirmed
    let notConfirmed = await singlemultisig.isConfirmed(0)
    assert.equal(notConfirmed, false)

    //cannot add another transaction
    await expectThrow(singlemultisig.submitTransaction(accounts[2], value, data, { from: accounts[0] }))

    //check other owners can confirm
    singlemultisig.confirmTransaction(0, { from: accounts[1] })
    let newConfirmations = await singlemultisig.getConfirmationCount(0, { from: accounts[0] })
    confirmations = await singlemultisig.getConfirmations(0, { from: accounts[0] })
    assert.equal(2,newConfirmations)
    assert.deepEqual([accounts[0], accounts[1]], confirmations)

    //since required confirmations is 2, tx is now confirmed and executed
    const is_confirmed = await singlemultisig.isConfirmed(0)
    assert.equal(is_confirmed, true)

    //check tx was correctly sent and contract returned remaining ETH as per Destuctible()
    assert.equal(web3.eth.getBalance(singlemultisig.address), 0)
    original_balance = original_balance.toNumber()
    assert.equal(web3.eth.getBalance(accounts[2]).toNumber(), original_balance + value)

  })
})
