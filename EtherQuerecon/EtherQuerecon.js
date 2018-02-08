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

//var geth_url = "https://ropsten.infura.io/XCC6u78kzejY7smtlXvW"; 
var geth_url1 = "http://172.18.64.91:8545";
var geth_url2 = "http://ethereum1.dynamic-dns.net:8545";

var geth_url  = geth_url1;

var user_address = "0xC946B501900DcE171c6eA3f4D56E6553736E22ed";
var user_password = "PEPE";
//var transaction_wei_cost = 100000;
var transaction_wei_cost = 0;
var transaction_gas = 4700000;

function gethStart() {
	if (typeof web3 !== 'undefined') {
		console.log(web3.currentProvider.host);
		if (web3.currentProvider.host != geth_url) {
			//the url has changed
			web3 = new Web3(new Web3.providers.HttpProvider(geth_url));
		}				
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.HttpProvider(geth_url));
	}
	var EtherQuerecon = web3.eth.contract(EtherQuereconAPI).at(address); 
}

function networkStatus() {
	console.log('networkStatus ...');	
	var results = document.getElementById('network_results');
	results.innerHTML = '<p><pre>Checking ...</pre></p>';
	
	try {
	
	results.innerHTML = '<p><pre>Node: ' + geth_url 
	+ '<br>Connected: ' + JSON.stringify(web3.isConnected())
	+ '<br>Version: ' + web3.version.node 
	+ '<br>Mining: ' + web3.eth.mining + '</pre></p>';
		
		
	web3.net.getPeerCount(function(error, result){  		
		results.innerHTML += '<p><pre>PeerCount: ' + result + '</pre></p>';
	});
	
	console.log('networkStatus 2');	
	
	var info = web3.eth.getBlock(web3.eth.blockNumber);	
	var date = new Date(info.timestamp*1000);
	var date2 = new Date();
	results.innerHTML += '<p><pre>BlockNumber: ' + web3.eth.blockNumber + ' - ' + date + ' hace ' + Math.round((date2 - date)/1000) + ' segundos'
	+ '<br>Transactions: ' + web3.eth.getBlockTransactionCount(web3.eth.blockNumber) 
	+ '<br>Last Transactions: ' + info.transactions + '</pre></p>';
		
	
	web3.eth.getHashrate(function(error, result){  		
		results.innerHTML += '<p><pre>Hashrate: ' + result + '</pre></p>';
	});
	
	} catch(ex) {
		results.innerHTML = '<p><pre>Error: ' + ex + '</pre></p>';
	}
	
	console.log('networkStatus end');	
	
}

function monitorizePendings() {
	
	console.log("monitorizePendings...");
	var results = document.getElementById('pending_results');
	results.innerHTML = '<p><pre>Checking ...</pre></p>';
	
	web3.eth.filter("pending").watch(
    function(error,result){
		console.log("Pendings watch");
        if (error) {
            console.log(result);
			var results = document.getElementById('pending_results');
			results.innerHTML = '<p><pre>Error: ' + error + '</pre></p>';
        } else {
			console.log(result);
			//var transaction = web3.eth.getTransaction(result);
			//console.log(transaction);
			var results = document.getElementById('pending_results');
			results.innerHTML = '<p><pre>New Pending: ' + result + '</pre></p>';
		}
    });
	console.log("monitorizePendings end");
}

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

gethStart();
