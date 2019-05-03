
// Require the web3 node module.
var Web3 = require('web3');

//INFURA URL
web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/328aa62401014388a80ff5b030ae69ca'));

console.log('web3 version:', web3.version);

web3.eth.getBlockNumber((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('blockNumber:', result);
});

web3.eth.getProtocolVersion((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('Protocol:', result);
});

web3.eth.net.getId((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('Net ID:', result);
});

web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1", (err, result) => {
    if(err) console.error('ERROR', err);
    console.log('Balance:', result);
});

//INFURA no expone personal
try {
	web3.personal.unlockAccount(walletAddr, walletPwd, 15000);
	console.log('wallet unlocked');
} catch(err) {
	console.log('Error in web3.personal.unlockAccount:', err);
}

console.log('End');


