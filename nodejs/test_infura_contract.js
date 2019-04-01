
// Require the web3 node module.
var Web3 = require('web3');

//codigo en https://github.com/AATDBS/Ethereum/blob/master/EntityContract.sol
//direccion del contrato desplegado en Rinkeby
const contractAddress = '0x511feae1dea1bbfbc9f59ab4475869c3103b1d12';
const contractJson = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "entityAddress",
				"type": "string"
			},
			{
				"name": "entityName",
				"type": "string"
			}
		],
		"name": "createEntity",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "entityAddress",
				"type": "string"
			}
		],
		"name": "getEntity",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

//Monedero de la red Rinkeby
const walletAddress = "0xCcA67a554b992cC960B82b34fD3e7fCEC14446a0";
const privateKey = '0xFADD2E2DD854353598EC2060A244D219120896815E4B9D7B185C3FC9D38B1987';


// Show Web3 where it needs to look for a connection to Ethereum.
//INFURA
web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/328aa62401014388a80ff5b030ae69ca'));
//OJO no usar el formato https://rinkeby.infura.io/v3

console.log('INFURA Test');

//1.0.0-beta.51
var version2 = web3.version;
console.log(version2); 

web3.eth.getBlockNumber((err, result) => {
	if(err) console.error('ERROR', err);
	console.log('INFURA blockNumber:', result);
});

web3.eth.getBalance(walletAddress, function (err, result) {
    if(err) { 
		console.error('ERROR', err);
	} else {
		console.log('getBalance:', result);
	}
});


const contract = new web3.eth.Contract(
  contractJson,
  contractAddress
);

// change this to whatever contract method you are trying to call, E.G. SimpleStore("Hello World")
const query = contract.methods.createEntity('Test','Test Value');
const encodedABI = query.encodeABI();
console.log('encodedABI:' , encodedABI);
const tx = {
  from: walletAddress,
  to: contractAddress,
  gas: 2000000,
  data: encodedABI,
};

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//console.log(account);
web3.eth.getBalance(walletAddress).then(console.log);

web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
  const tran = web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('=> confirmation: ' + confirmationNumber);
    })
    .on('transactionHash', hash => {
      console.log('=> hash');
      console.log(hash);
    })
    .on('error', console.error);
});

console.log('End');


