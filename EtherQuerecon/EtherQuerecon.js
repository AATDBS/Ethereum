//datos del contrato
var address = '0xC946B501900DcE171c6eA3f4D56E6553736E22ed';
var EtherProofAPI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getTimestamp",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getBlockNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "checkExistence",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "addFile",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
];

var geth_url = "http://172.18.64.91:8545";

var user_address = "0xC946B501900DcE171c6eA3f4D56E6553736E22ed";
var user_password = "PEPE";
var transaction_wei_cost = 100000;
var transaction_gas = 4700000;


if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
	//web3 = new Web3(new Web3.providers.HttpProvider("http://172.18.64.91:8545"));
	web3 = new Web3(new Web3.providers.HttpProvider(geth_url));
}
var EtherProof = web3.eth.contract(EtherProofAPI).at(address);

function existence() {
	console.log('Checking');
		
	var hash = document.getElementById('hash').value;
    var existence = document.getElementById('existence');
	
	existence.innerHTML = '<h2> Checking ... </h2>';
	
	console.log('Hash to check:' + hash);
	
	//if (hash.length != 66) {
	//	existence.innerHTML = '<h2> Invalid hash</h2>';
	//} else {
		
		var fileExistence = EtherProof.checkExistence(hash, function(error, result) {
			
			if (error) {
					console.error(error);
			} else {
				console.log(result);				
				
				if (!result) {
					existence.innerHTML = '<h2> This index does not exist </h2>';
				} else {
					existence.innerHTML = '<h2> This index do exists </h2>';
					EtherProof.getTimestamp(hash, function(error, result) {
						if (error) {
								console.error(error);
						} else {
							console.log(result);
							existence.innerHTML += '<p> Timestamp: ' + new Date(result * 1000) + '</p>';
						}
					}); 
					EtherProof.getBlockNumber(hash, function(error, result) {
						if (error) {
								console.error(error);
						} else {
							console.log(result);
							existence.innerHTML += '<p> Block Number: ' + result + '</p>';
						}
					});
					
				}
			}
		});
	
}

function addIndex() {
	console.log('addIndex...');
	
	var hash = document.getElementById('hash_new').value;
	var existence = document.getElementById('added');	
	existence.innerHTML = '<h2> Checking ... </h2>';
	
	var fileExistence = EtherProof.checkExistence(hash, function(error, result) {			
		if (error) {
				console.error(error);
		} else {
			console.log(result);
			if (result) {
				existence.innerHTML = '<h2> This index does exist already</h2>';
			} else {
				//desbloquea la cuenta
				web3.personal.unlockAccount(user_address, user_password, 15000);
				
				//invoca la transaccion
				EtherProof.addFile.sendTransaction(
                hash,
                {
                        from: user_address, 
                        value: transaction_wei_cost, //wei
                        gas: transaction_gas
                }, function(error, result) {
					if (error) {
							console.error(error);
							existence.innerHTML = '<p> Error: ' + error + '</p>';
					} else {
						console.log(result);
						existence.innerHTML = '<h2> Added: ' + result + '</h2>';
						
						var transaction = web3.eth.getTransaction(result);
						console.log(transaction);
						
						existence.innerHTML += '<pre>' + JSON.stringify(transaction) + '</pre>';
					}
				});
			}				
		}
	});	
}