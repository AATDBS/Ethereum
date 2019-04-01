
// Require the web3 node module.
var Web3 = require('web3');

// Show Web3 where it needs to look for a connection to Ethereum.
//web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35/rpc'));
//INFURA
web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/328aa62401014388a80ff5b030ae69ca'));

console.log('INFURA Test');

var version2 = web3.version;
console.log(version2); 

web3.eth.getBlockNumber((err, result) => {
	if(err) console.error('ERROR', err);
	console.log('INFURA blockNumber:', result);
});

web3.eth.getProtocolVersion((err, result) => {
    if(err) console.error('ERROR', err);
    console.log('INFURA Protocol:', result);
});

web3.eth.getBalance("0xfBd19bF25433Cb92FBf2053521E4E01811CCE16d", "latest", (err, result) => {
    if(err) { 
		console.error('ERROR', err);
	} else {
		console.log('INFURA getBalance:');
		console.log('INFURA getBalance:', result);
	}
});

try {
web3.eth.getBalance("0xfBd19bF25433Cb92FBf2053521E4E01811CCE16d", function (err, result) {
    if(err) { 
		console.error('ERROR', err);
	} else {
		console.log('INFURA 2getBalance:');
		console.log('INFURA 2getBalance:', result);
	}
});
} catch(ex) {
		console.log(ex);
}

// Use Wb3 to get the balance of the address, convert it and then show it in the console.
web3.eth.getBalance("0xfBd19bF25433Cb92FBf2053521E4E01811CCE16d", function (error, result) {
	if (!error)
		console.log('Ether:', web3.utils.fromWei(result,'ether')); // Show the ether balance after converting it from Wei
	else
		console.log('Huston we have a promblem: ', error); // Should dump errors here
});

console.log('End');


