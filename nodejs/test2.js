
// Require the web3 node module.
var Web3 = require('web3');

// Show Web3 where it needs to look for a connection to Ethereum.
web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35/rpc'));
//web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35:22000'));
//web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/328aa62401014388a80ff5b030ae69ca'));

console.log(web3);

web3.eth.getBlockNumber((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('blockNumber:', result);
});

web3.eth.getProtocolVersion((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('Protocol:', result);
});

web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1", (err, result) => {
    if(err) console.error('ERROR', err);
    console.log('Balance:', result);
});

console.log('End');


