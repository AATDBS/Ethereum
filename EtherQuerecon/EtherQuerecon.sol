pragma solidity ^0.4.18;

contract QuereconFileContract{
    
address private creator;    

//constructor
function EntityContract() public 
{
    creator = msg.sender; 
}

//Standard kill() function to recover funds 
function kill() public
{ 
    if (msg.sender == creator)
        selfdestruct(creator);  // kills this contract and sends remaining funds back to creator
}

//struct for Fichero
struct Fichero {
	//uint idFichero;       // identificacion del fichero //se utiliza como index del array
	address userAddress;    // usuario que registra el expediente
    uint fecha;             // fecha cuando se registra el expediente
    bytes32 hash;           // hash del fichero
}

//struct for Expediente
struct ExpedienteFichero {
	//uint idExpediente;          // identificacion del expediente //se utiliza como index del array
	string codigoExpediente;    // identificacion del expediente (AAAANNNNN)
	address userAddress;        // usuario que registra el expediente
    uint fecha;                 // fecha cuando se registra el expediente
    uint numeroFicheros;        // numero de ficheros registrados
    mapping (uint256 => Fichero) ficheros ; // array de ficheros, uitiliza el id como indice
}
//internal arrays
mapping (uint256 => ExpedienteFichero ) private expedientes ; // array de expedientes, se utiliza el id como index

//crea una entidad
function createExpediente(uint256 expedienteId, string codigoExpediente) public returns (bool) 
{
    //comprueba que no exista ya
    require(expedientes[expedienteId].fecha == 0);
    
	//crea la entidad
	expedientes[expedienteId].codigoExpediente = codigoExpediente; 
	expedientes[expedienteId].fecha = now; //tiempo de creacion
    expedientes[expedienteId].userAddress = msg.sender; //usuario que lanza la transaccion
    expedientes[expedienteId].numeroFicheros = 0;
	
	//TODO: completa el array por referencia
	//entitiesbyRef[codigoExpediente] = expedienteId;
    
    return true;
}

//crea un fichero
function createFichero(uint256 expedienteId, uint256 ficheroId, bytes32 ficheroHash) public returns (bool) 
{
    //si no existe la entidad da error
    require(expedientes[expedienteId].fecha != 0);
	//si existe el fichero da error
	require(expedientes[expedienteId].ficheros[ficheroId].fecha == 0);
    
    expedientes[expedienteId].numeroFicheros++;
    
    expedientes[expedienteId].ficheros[ficheroId].userAddress = msg.sender; //usuario que lanza la transaccion
    expedientes[expedienteId].ficheros[ficheroId].fecha = now;
    expedientes[expedienteId].ficheros[ficheroId].hash = ficheroHash;
    
    return true;
}

//recupera los datos de un expediente
function getEntity(uint256 expedienteId) public view returns (string, uint256, address, uint256) {

    //si no existe da error
    require(expedientes[expedienteId].fecha != 0);
    
    //si existe devuelve sus datos
    return (expedientes[expedienteId].codigoExpediente , expedientes[expedienteId].fecha, expedientes[expedienteId].userAddress, expedientes[expedienteId].numeroFicheros);
}

//recupera un fichero
function getEntityStatus(uint256 expedienteId, uint256 ficheroId) public view returns (address, uint256, bytes32 ) {

    //si no existe el fichero da error
    require(expedientes[expedienteId].ficheros[ficheroId].fecha != 0);
    
    //si existe devuelve sus datos
    return (expedientes[expedienteId].ficheros[ficheroId].userAddress, expedientes[expedienteId].ficheros[ficheroId].fecha, expedientes[expedienteId].ficheros[ficheroId].hash);
}

} //end contract
