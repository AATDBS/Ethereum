// Constantes
var _OK = 0;               // Sin errores
var _EXIST_ERR = 100;      // Error de existencia

var reader = new FileReader();
var file;
var toBeHashed = '';

// Locale para formato de fechas
moment.locale('es-ES');

// Clipboard.js
new ClipboardJS('.fa-clipboard');

// Iconos de ficheros
var extIcons = { 
	doc: 'fa-file-word', 
	docx: 'fa-file-word', 
	xls: 'fa-file-excel', 
	xlsx: 'fa-file-excel', 
	csv: 'fa-file-excel', 
	ppt: 'fa-file-powerpoint', 
	pptx: 'fa-file-powerpoint', 
	png: 'fa-file-image', 
	jpg: 'fa-file-image', 
	gif: 'fa-file-image', 
	pdf: 'fa-file-pdf',
	zip: 'fa-file-archive',
	rar: 'fa-file-archive',
	tar: 'fa-file-archive',
	gz: 'fa-file-archive',
	jar: 'fa-file-archive',
	avi: 'fa-file-video',
	mpg: 'fa-file-video',
	txt: 'fa-file-alt',
	js: 'fa-file-code',
	java: 'fa-file-code',
	xml: 'fa-file-code',
	mp3: 'fa-file-audio'
};
	
//datos del contrato
var address = '0x422d44f17ef2e89976868cdc50442ccbb07ac107';
var etherQuereconAPI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "ficheroHash",
				"type": "bytes32"
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
				"type": "uint256"
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
				"name": "ficheroHash",
				"type": "bytes32"
			}
		],
		"name": "createFichero",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ficheroHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "statusCode",
				"type": "uint256"
			}
		],
		"name": "ficheroInfo",
		"type": "event"
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
	}
];

var geth_nodes = [
	{
		"url": "http://172.18.64.155/ether/",
		"name": "Nodo 1 - Sevilla, Spain"
	}, {
		"url": "http://ethereum1.dbslabs.es/ether/",
		"name": "Nodo 2 - AWS Ireland"
	}, {
		"url": "http://ethereum2.dbslabs.es/ether/",
		"name": "Nodo 3 - AZURE USA"
	}
];
var geth_node;
var user_address = "0xC946B501900DcE171c6eA3f4D56E6553736E22ed";
var user_password = "PEPE";

//var transaction_wei_cost = 100000;
var transaction_wei_cost = 0;
var transaction_gas = 4700000;

var etherQuerecon;

var blockNumber, blockStamp, transactionsInfo;

var blockFilter;

// Inicio
$(function() {
	
	// Mostramos mensaje de espera
	showWait();
	
	// 
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// Mostramos lista de nodos
		showNodes();
		
		// Comprobación inicial del estado de los nodos
		checkNodes();		
		
		// Pintamos info de la red usada y activamos refresco
		setInterval(function(){
			networkInfo();
		}, 30000);
		
		// Comprobamos estado de los nodos
		setInterval(function(){
			checkNodes();
		}, 60000);
	}	
});

$(function() {
	// We can attach the `fileselect` event to all file inputs on the page
	$(document).on('change', '#f1-file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
		$('#overlay-f1').show();
		loop();
	});
	  
	$(document).on('change', '#f2-file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
		$('#overlay-f2').show();
		loop();
	});

	// We can watch for our custom `fileselect` event like this
	$(document).ready( function() {
			  
		$('#f1-file').on('fileselect', function(event, numFiles, label) {
			var input = $(this).parents('.input-group').find(':text'),
			  log = numFiles > 1 ? numFiles + ' files selected' : label;

			if( input.length ) {
			  input.val(log);
			  file = $(this).get(0).files[0];
			  
			  reader.onloadend = function(evt) {
					if (evt.target.readyState == FileReader.DONE) {
						var result = evt.target.result;
						toBeHashed = result;
					}
											
					$('#hash-f1').val(web3.sha3(toBeHashed));
					$('#overlay-f1').hide();
				};
			  
			} else {
			  if( log ) alert(log);
			}
		});
	  
		$('#f2-file').on('fileselect', function(event, numFiles, label) {
			var input = $(this).parents('.input-group').find(':text'),
			  log = numFiles > 1 ? numFiles + ' files selected' : label;

			if( input.length ) {
			  input.val(log);
			  file = $(this).get(0).files[0];
			  
			  reader.onloadend = function(evt) {
					if (evt.target.readyState == FileReader.DONE) {
						var result = evt.target.result;
						toBeHashed = result;
					}
											
					$('#hash-f2').val(web3.sha3(toBeHashed));
					$('#overlay-f2').hide();
				};
			  
			} else {
			  if( log ) alert(log);
			}
		});
	});  
});


function showNodes() {
	$.each(geth_nodes, function( key, value ) {
		showNodeStatus(key, value);
	});
}

function checkNodes() {
	$.each( geth_nodes, function( key, value ) {
		try {
			var web3_ping = new Web3(new Web3.providers.HttpProvider(value.url));
			web3_ping.version.getNode(function(error, result){
				if(error) {
					console.log("ping fail");
					value.status = false;
					showNodeStatus(key, value);
				} else {
					value.status = true;
					if(!geth_node) { 
						geth_node = value;					
						init();				
					}
					showNodeStatus(key, value);
				}
			});
		}
		catch(err) {
			console.log("checkNodes - ERROR", err);
		}
	});
}


// Inicio
function init() {
	console.log('init');
	// Instanciamos Web3 con el nodo seleccionado
	web3 = new Web3(new Web3.providers.HttpProvider(geth_node.url));

	//Info de la red Ethereum
	networkInfo();

	// Pintamos info del bloque actual
	web3.eth.getBlock('latest', false, function (err, result) {
		$("#block-info").html(result.number);		
		$("#blockStamp-info").html(moment.unix(result.timestamp).fromNow());
		$("#block-list div").append('<div class="btn btn-bloque active" style="font-size: 12px; line-height: 32px;">' + result.number + '</div>');	
		$("#block-list div.btn-bloque:last").click(function() {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			
			animationBlock($(this));
			
			blockInfo(result);
		});		
				
		blockInfo(result);
	});	

	// Pintamos último bloque ejecutado
	blockFilter = web3.eth.filter('latest', function(error, result){
		console.log('filter', result);
		if (!error)
			web3.eth.getBlock(result, function(error, result){
				if(!error) {
					$("#block-info").html(result.number);
					$("#blockStamp-info").html(moment.unix(result.timestamp).fromNow());					
					$("#block-list div.btn-bloque:last").after('<div class="btn btn-bloque" style="font-size: 12px; line-height: 32px;" id="' + result.number + '">' + result.number + '</div>');
					$("#block-list div.btn-bloque:last").click(function() {
						$(this).siblings().removeClass("active");
						$(this).addClass("active");
						
						animationBlock($(this));
						
						blockInfo(result);
					});					

					var target = $("#block-list div:first"); 
					target.animate({ scrollTop: target.prop('scrollHeight') }, 1500);
				} else
					console.error(error);
			});
		else 
			console.error(error);
	});

	// Inicializamos contrato
	etherQuerecon = web3.eth.contract(etherQuereconAPI).at(address);

	// Evento de fin de transacción
	etherQuerecon.ficheroInfo().watch(function(error, result) {
		console.log('watch...');
		if (error) {
			console.log('Error: ', error);
		} else {
			console.log('Result: ', result);
			
			var transactionHash = result.transactionHash;
			if(result.args.statusCode == _OK) {  // Transacción realizada correctamente
				$("#transactionHash-s").html(result.transactionHash);
				$("#transactionHash-s").css('float', 'left');
				$("#transactionHash-s").parent().append('<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#transactionHash-s"></i>');
				
				$("#blockNumber-s").html(result.blockNumber);	
				$("#blockNumber-s").css('float', 'left');
				$("#blockNumber-s").parent().append('<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#blockNumber-s"></i>');
				$("#blockNumber-s").parents("li").addClass("action");				
				web3.eth.getBlock(result.blockNumber, false, function (err, result) {	
					if(!error) {
						var timestamp = moment.unix(result.timestamp);
						$("#dateTransation").html(timestamp.format("DD/MM/YYYY HH:mm:ss"));
					}
				});					
				$("#statusCode").html("Fichero sellado correctamente.");
			} else { // Error en la transacción				
				$("#transactionHash-s").html(result.transactionHash);
				$("#blockNumber-s").html(result.blockNumber);
				$("#blockNumber-s").parents("li").addClass("action");
				web3.eth.getBlock(result.blockNumber, false, function (err, result) {	
					if(!error) {
						var timestamp = moment.unix(result.timestamp);
						$("#dateTransation").html(timestamp.format("DD/MM/YYYY HH:mm:ss"));
					}
				});
				$("#statusCode").html("El fichero ya existe.");
			}
			
			//Evento al pulsar la seccion blockNumber
			$("#blockNumber-s").parents("li").click(function() {
				web3.eth.getBlock(result.blockNumber, false, function (err, result) {	
					if(!error) {
						//marcamos bloque en la lista de bloques
						$(".btn.btn-bloque").removeClass("active");
						$('#' + result.number).addClass("active");
						
						//mostramos info del bloque seleccionado
						blockInfo(result);
					}
				});
			});
		}
	});
}

// Crea estampado de fichero
function createFichero(ficheroHash, filename) {	
	console.log('createFichero ...');
							
	// cuenta ethereum por defecto (p.e. la primera)
	web3.eth.defaultAccount = user_address;
		
	// desbloquea la cuenta
	web3.personal.unlockAccount(user_address, user_password, 15000);
			
	// lanzamos transacción
	etherQuerecon.getFichero(ficheroHash, function(error, result) {			
		if (error) {
			console.error(error);
		} else {
			console.log('transactionHash: ', result);	

			if(result[0] == '0x0000000000000000000000000000000000000000') { // No existe el fichero
				etherQuerecon.createFichero(ficheroHash, function(error, result) {
					if (error) {
						console.error('error: ', error);
					} else {
						console.log('transactionHash: ', result);	

						var transactionHash = result;
						var fileClass = extIcons[filename.substring(filename.lastIndexOf(".")+1).toLowerCase()];
											
						var row_html = 
							'<p>El fichero ha sido registrado correctamente.</p>' +
							'<p>Información de sellado:</p>' +
							'<div class="card-body" style="padding: 0.25rem;">' +
							'	<ul class="todo-box">' +
							'		<li class="border-azure">' +			
							'			<div class="info-box">' +
							'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
							'				<div class="info-box-content">' +
							'					<span class="info-box-text">Hash del Fichero</span>' +
							'					<span class="info-box-number" id="fileHash-s" style="float: left;">' + ficheroHash + '</span>' +
							'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#fileHash-s"></i>' +
							'				</div>' +
							'			</div>' +		
							'		</li>' +		
							'		<li class="border-red">' +
							'			<div class="info-box">' +
							'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
							'				<div class="info-box-content">' +
							'					<span class="info-box-text">Hash de la Transacción</span>' +
							'					<span class="info-box-number" id="transactionHash-s"><i class="fas fa-sync fa-spin"></i></span>' +
							'				</div>' +
							'			</div>' +		
							'		</li>' +		
							'		<li class="border-orange">' +
							'			<div class="info-box">' +
							'				<span class="info-box-icon"><i class="fas fa-cube"></i></span>' +
							'				<div class="info-box-content">' +
							'					<span class="info-box-text">Bloque</span>' +
							'					<span class="info-box-number" id="blockNumber-s"><i class="fas fa-sync fa-spin"></i></span>' +
							'				</div>' +
							'			</div>' +		
							'		</li>' +		
							'		<li class="border-blue">' +
							'			<div class="info-box">' +
							'				<span class="info-box-icon"><i class="far fa-clock"></i></span>' +
							'				<div class="info-box-content">' +
							'					<span class="info-box-text">Fecha de Sellado</span>' +
							'					<span class="info-box-number" id="dateTransation"><i class="fas fa-sync fa-spin"></i></span>' +
							'				</div>' +
							'			</div>' +		
							'		</li>' +							
							'		<li class="border-purple">' +
							'			<div class="info-box">' +
							'				<span class="info-box-icon"><i class="far fa-comment"></i></span>' +
							'				<div class="info-box-content">' +
							'					<span class="info-box-text">Mensaje</span>' +
							'					<span class="info-box-number" id="statusCode"><i class="fas fa-sync fa-spin"></i></span>' +
							'				</div>' +
							'			</div>' +		
							'		</li>' +	
							'	</ul>' +
							'</div>';
						$('#stamp-result').html(row_html);
					}
				});
			} else {
				// Recuperamos información de la transacción asociada al fichero existente
				web3.eth.getBlock(result[2].c[0], false, function (err, result) {
					var transactionHash = result.transactions[0];
					var blockNumber = result.number;
					var timestamp = moment.unix(result.timestamp).format("DD/MM/YYYY HH:mm:ss");
					
					var row_html = 
						'<p>Este fichero ya se encuentra sellado.</p>' +
						'<p>Información de sellado:</p>' +
						'<div class="card-body" style="padding: 0.25rem;">' +
						'	<ul class="todo-box">' +
						'		<li class="border-azure">' +			
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Hash del Fichero</span>' +
						'					<span class="info-box-number" id="fileHash-s" style="float: left;">' + ficheroHash + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#fileHash-s"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-red">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Hash de la Transacción</span>' +
						'					<span class="info-box-number" style="float: left;" id="transactionHash-s">' + transactionHash + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#transactionHash-s"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-orange action">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="fas fa-cube"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Bloque</span>' +
						'					<span class="info-box-number" style="float: left;" id="blockNumber-s">' + blockNumber + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#blockNumber-s"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-blue">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-clock"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Fecha de Sellado</span>' +
						'					<span class="info-box-number" id="dateTransation">' + timestamp + '</span>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +							
						'	</ul>' +
						'</div>';											
					$('#stamp-result').html(row_html);	

					//Evento al pulsar la seccion blockNumber
					$("#blockNumber").parents("li").click(function() {
						//marcamos bloque en la lista de bloques
						$(".btn.btn-bloque").removeClass("active");
						$('#' + result.number).addClass("active");
						
						//mostramos info del bloque seleccionado
						blockInfo(result);
					});
				});
			}
			$('#overlay-f1').hide();
		}
	});
	
	
}

// Verifica fichero
function verificarFichero(ficheroHash, filename) {
	console.log('verificarFichero ...', ficheroHash);
	
	// cuenta ethereum por defecto (p.e. la primera)
	web3.eth.defaultAccount = user_address;
		
	// desbloquea la cuenta
	web3.personal.unlockAccount(user_address, user_password, 15000);
			
	// lanzamos verificación
	etherQuerecon.getFichero(ficheroHash, function(error, result) {			
		if (error) {
			console.error(error);
		} else {
			console.log('transactionHash: ', result);	

			var recentHashesRows = $('#recentVerifyHashes tr.recentHashes-row');
			var current_row = recentHashesRows.length + 1;
						
			if(result[0] == '0x0000000000000000000000000000000000000000') { // No existe el fichero
				var row_html = 
					'<p>Información de sellado:</p>' +
					'<div class="card-body" style="padding: 0.25rem;">' +
					'	<ul class="todo-box">' +
					'		<li class="border-azure">' +			
					'			<div class="info-box">' +
					'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
					'				<div class="info-box-content">' +
					'					<span class="info-box-text">Hash del Fichero</span>' +
					'					<span class="info-box-number" id="fileHash-v" style="float: left;">' + ficheroHash + '</span>' +
					'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#fileHash-v"></i>' +
					'				</div>' +
					'			</div>' +		
					'		</li>' +		
					'		<li class="border-purple">' +
					'			<div class="info-box">' +
					'				<span class="info-box-icon"><i class="far fa-comment"></i></span>' +
					'				<div class="info-box-content">' +
					'					<span class="info-box-text">Mensaje</span>' +
					'					<span class="info-box-number" id="statusCode">El fichero no existe.</span>' +
					'				</div>' +
					'			</div>' +		
					'		</li>' +	
					'	</ul>' +
					'</div>';					
				$('#verify-result').html(row_html);
			} else {
				// Recuperamos información de la transacción asociada al fichero existente
				web3.eth.getBlock(result[2].c[0], false, function (err, result) {
					var transactionHash = result.transactions[0];
					var blockNumber = result.number;
					var timestamp = moment.unix(result.timestamp).format("DD/MM/YYYY HH:mm:ss");
		
					var row_html = 
						'<p>Información de sellado:</p>' +
						'<div class="card-body" style="padding: 0.25rem;">' +
						'	<ul class="todo-box">' +
						'		<li class="border-azure">' +			
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Hash del Fichero</span>' +
						'					<span class="info-box-number" id="fileHash-v" style="float: left;">' + ficheroHash + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#fileHash-v"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-red">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-list-alt"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Hash de la Transacción</span>' +
						'					<span class="info-box-number" style="float: left;" id="transactionHash-v">' + transactionHash + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#transactionHash-v"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-orange action">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="fas fa-cube"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Bloque</span>' +
						'					<span class="info-box-number" style="float: left;" id="blockNumber-v">' + blockNumber + '</span>' +
						'					<i class="far fa-clipboard" style="float: right;" data-clipboard-target="#blockNumber-v"></i>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +		
						'		<li class="border-blue">' +
						'			<div class="info-box">' +
						'				<span class="info-box-icon"><i class="far fa-clock"></i></span>' +
						'				<div class="info-box-content">' +
						'					<span class="info-box-text">Fecha de Sellado</span>' +
						'					<span class="info-box-number" id="dateTransation">' + timestamp + '</span>' +
						'				</div>' +
						'			</div>' +		
						'		</li>' +							
						'	</ul>' +
						'</div>';						
					$('#verify-result').html(row_html);
					
					//Evento al pulsar la seccion blockNumber
					$("#blockNumber-v").parents("li").click(function() {
						//marcamos bloque en la lista de bloques
						$(".btn.btn-bloque").removeClass("active");
						$('#' + result.number).addClass("active");
						
						//mostramos info del bloque seleccionado
						blockInfo(result);
					});
				});
			}
		}
		$('#overlay-f2').hide();
	});
}

// Recupera información de estampado de fichero
function getFichero() {	
	console.log('getFichero ...');
		
	var ficheroId = document.getElementById('getFicheroId').value;
	var results = document.getElementById('getFichero_results');
	
	results.innerHTML = '<h2> Get ... </h2>';
			
	var fileExistence = etherQuerecon.getFichero(ficheroId, function(error, result) {
			
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

// Actualiza información en pantalla
function networkInfo() {
	console.log('networkInfo ...');
		
	if(geth_node) {
		$("#node-info").html(geth_node.name);
		web3.version.getNode(function(error, result){
			$("#version-info").html(result);
			$("#status-info").html((error)?'<span class="red">Desconectado</span>':'<span class="green">Conectado</span>');
		});
		$("#refreshStamp-info").html('Actualizado ' + moment().fromNow());
	}
}

function showNodeStatus(idx, node) {
	if($("#node-" + idx).length) {
		$("#node-" + idx + " img").attr("src", ((node.status)?'./plug-green.png':'./unplug-grey.png'));
	} else {
		if($("#node-list a:last").length > 0)
			$("#node-list a:last").after('<a id="node-' + idx + '" href="#" class="list-group-item list-group-item-action text-secondary" style="background-color: inherit; padding: 0 0.25rem;"><img src="' + ((node.status)?'./plug-green.png':'./unplug-grey.png') + '" style="width: 20px; margin-right: 5px;" />' + node.name + '</a>');
		else
			$("#node-list").append('<a id="node-' + idx + '" href="#" class="list-group-item list-group-item-action text-secondary" style="background-color: inherit; padding: 0 0.25rem;"><img src="' + ((node.status)?'./plug-green.png':'./unplug-grey.png') + '" style="width: 20px; margin-right: 5px;" />' + node.name + '</a>');
		
		$("#node-list a:last").click(function(){ 
			if(node.status) {
				geth_node = node;
				blockFilter.stopWatching(); //eliminamos filtro para el nodo actual
				clearBlockList();
			}
		});
	}
}

function clearBlockList() {
	$("#block-list div").empty();
	init();
}

// Pintamos info del bloque
function blockInfo(blockObj) {
	console.log('blockInfo', blockObj);
	$("#block-details").html(
		'<div class="media" style="display: -webkit-box;">' +
		'  	<span class="thumbnail text-center">' +
		'		<img id="block" src="./large-block-orange.png" alt="" class="img-responsive">' +
		'		<div class="caption"><p style="color: white">' + blockObj.number + '</p></div>' +
		'	</span>' +
		'	<div class="media-body" style="padding-left: 15px;">' +
		'		<div><strong>' + moment.unix(blockObj.timestamp).format("DD/MM/YYYY HH:mm:ss") + '</strong></div>' +
		'		<div><span>' + blockObj.hash + '</span></div>' +	
		'		<div><strong>Transaciones: ' + blockObj.transactions.length + '</strong></div>' +
		'  	</div>' +
		'</div>' +
		'</br>' +
		'<div id="block-transactions"></div>'
	);
	
	if (blockObj.transactions.length > 0) {
		$("#block-transactions").html('<div><strong>Hash de la transacción</strong></div>');
		$.each( blockObj.transactions, function( key, value ) {
			$("#block-transactions div:last").after('<div><span>' + value + '</span></div>');
		});		 
	}	
}

function showWait() {
    $('#overlay').fadeOut(1500);
}

function hideWait() {
	$('#overlay').hide();
}

function animationBlock(el) {
	var cart = $('#block');
	var imgtodrag = el;
	
	if (imgtodrag) {
		var imgclone = imgtodrag.clone();
		
		imgclone
			.offset({
			top: imgtodrag.offset().top,
			left: imgtodrag.offset().left
		});
		
		imgclone
			.css({
			'opacity': '0.5',
			'position': 'absolute',
			'z-index': '100'
		});
		
		imgclone
			.appendTo($('body'));
			
		imgclone
			.animate({
			'top': cart.offset().top,
			'left': cart.offset().left
		}, 1000, 'easeInOutExpo');
		
		imgclone.animate({
			'width': 0,
			'height': 0
		}, function () {
			$(this).detach()
		});
	}
}

function loop() {
	if (!file) {
		alert('Please select a file!');
		return;
	}
	reader.readAsText(file);
}
