
// Require the web3 node module.
var Web3 = require('web3');

// Show Web3 where it needs to look for a connection to Ethereum.
//web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35:22000'));
web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35/rpc'));
//web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/328aa62401014388a80ff5b030ae69ca'));

// Pintamos info del bloque actual
console.log('getBlock');
web3.eth.getBlock('latest', false, function (err, result) {
	console.log('getBlock result:');
	console.log('number:', result.number);
	console.log(result);
	console.log(err);
});

console.log('End');

