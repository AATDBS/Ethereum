
// Require the web3 node module.
var Web3 = require('web3');

// contrato
// codigo en https://github.com/AATDBS/Ethereum/blob/master/EntityContract.sol
// direccion del contrato desplegado en Alastria
//const contractAddress = '0xfc45a82b89f0984e99c58f26273d1ac4059f9ce1';
const contractAddress = '0xaf2429529b16ca59dd6fb394bf83bb79ababb0a3';
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

console.log('contractAddress:', contractAddress);

//Monedero a utilizar
const walletAddress = "0xCcA67a554b992cC960B82b34fD3e7fCEC14446a0";
const privateKey = '0xFADD2E2DD854353598EC2060A244D219120896815E4B9D7B185C3FC9D38B1987';

console.log('walletAddress:', walletAddress);

// Alastria Node
web3 = new Web3(new Web3.providers.HttpProvider('http://99.80.181.35/rpc'));

console.log('HttpProvider:', 'http://99.80.181.35/rpc');

console.log('Start Contract Test');

//1.0.0-beta.51
var version2 = web3.version;
console.log('web3.version', version2); 

web3.eth.getBlockNumber((err, result) => {
	if(err) console.error('ERROR', err);
	console.log('Alastria blockNumber:', result);
});

web3.eth.getBalance(walletAddress, function (err, result) {
    if(err) { 
		console.error('ERROR', err);
	} else {
		console.log('getBalance:', result);
	}
});

//Genera una par de Fichero y Hash con la fecha-hora de hoy
var ficheroHash = "Test123 " + new Date().toISOString();
var ficheroValue = "Test123 Value " + new Date().toISOString();

console.log('ficheroHash:', ficheroHash);


const contract = new web3.eth.Contract(
  contractJson,
  contractAddress
);

// change this to whatever contract method you are trying to call, E.G. SimpleStore("Hello World")
const query = contract.methods.createEntity(ficheroHash, ficheroValue);
const encodedABI = query.encodeABI();
console.log('encodedABI:' , encodedABI);
const tx = {
  from: walletAddress,
  to: contractAddress,
  gas: 2000000,
  data: encodedABI,
  chainId: 83584648538
};

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//console.log(account);
web3.eth.getBalance(walletAddress).then(console.log);

web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
  const tran = web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('=> confirmation: ' + confirmationNumber);
	  console.log('Receipt:', receipt);
	  console.log('------- EJECUCION CORRECTA -------------');
    })
    .on('transactionHash', hash => {
      console.log('=> hash');	  
	  console.log(hash);
    })
    .on('error', errorData => {
	  console.log('=> error');	  
	  console.log(errorData);
	})
});



console.log('End');


