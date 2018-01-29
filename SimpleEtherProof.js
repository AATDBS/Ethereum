if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	web3 = new Web3(new Web3.providers.HttpProvider("http://172.18.64.91:8545"));
}

var address = '0x2a3d523c56c8848674fe96bad2a2ebd3f20aeee2';
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