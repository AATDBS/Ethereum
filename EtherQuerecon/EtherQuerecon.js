//datos del contrato
var address = '0x9537ca69649859fd35960e19f591b8543ee91b66';
var EtherQuereconAPI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "ficheroId",
				"type": "uint256"
			}
		],
		"name": "getFichero",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "EntityContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ficheroId",
				"type": "uint256"
			},
			{
				"name": "ficheroHash",
				"type": "bytes32"
			}
		],
		"name": "createFichero",
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
	}
];

var geth_url = "http://172.18.64.91:8545";

var user_address = "0xC946B501900DcE171c6eA3f4D56E6553736E22ed";
var user_password = "PEPE";
//var transaction_wei_cost = 100000;
var transaction_wei_cost = 0;
var transaction_gas = 4700000;


if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
	//web3 = new Web3(new Web3.providers.HttpProvider("http://172.18.64.91:8545"));
	web3 = new Web3(new Web3.providers.HttpProvider(geth_url));
}
var EtherQuerecon = web3.eth.contract(EtherQuereconAPI).at(address);

function createFichero() {
	
	console.log('Create ...');
		
	var ficheroId = document.getElementById('ficheroId').value;
	var ficheroHash = document.getElementById('ficheroHash').value;
    var results = document.getElementById('createFichero_results');
	
	results.innerHTML = '<h2> Create ... </h2>';
	
	//desbloquea la cuenta
	web3.personal.unlockAccount(user_address, user_password, 15000);
			
	var fileExistence = EtherQuerecon.createFichero.sendTransaction(
                ficheroId, ficheroHash,
                {
                        from: user_address, 
                        value: transaction_wei_cost, //wei
                        gas: transaction_gas
                }, function(error, result) {
			
		if (error) {
			console.error(error);
			results.innerHTML = '<h2> Error al crear el fichero </h2>';
		} else {
			console.log(result);				
			results.innerHTML = '<h2> Fichero registrado correctamente </h2>';
			results.innerHTML += '<p>Transaction: <pre>' + result + '</pre></p>';
		}
	});
	
}

function getFichero() {
	
	console.log('Get ...');
		
	var ficheroId = document.getElementById('getFicheroId').value;
    var results = document.getElementById('getFichero_results');
	
	results.innerHTML = '<h2> Get ... </h2>';
			
	var fileExistence = EtherQuerecon.getFichero(ficheroId, function(error, result) {
			
		if (error) {
				console.error(error);
				results.innerHTML = '<h2> Error al obtener el fichero </h2>';
		} else {
			console.log(result);							
			results.innerHTML = '<h2> Fichero : </h2>';
			results.innerHTML += '<pre>' + JSON.stringify(result) + '</pre>';
		}
	});
	
}

function transactionInfo() {

	console.log('transactionInfo ...');
		
	var transactionId = document.getElementById('transactionId').value;
    var results = document.getElementById('transactionInfo_results');	
	
	var transaction = web3.eth.getTransaction(transactionId);
	console.log(transaction);
						
	results.innerHTML = '<h2> Tranx: ' + transactionId + '</h2>';
	results.innerHTML += '<pre>' + JSON.stringify(transaction) + '</pre>';
	
}
