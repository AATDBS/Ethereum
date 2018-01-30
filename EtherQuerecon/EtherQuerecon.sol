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

//internal arrays
mapping (uint256 => Fichero ) private ficheros ; // array de ficheros, se utiliza el id como index

//crea un fichero
function createFichero(uint256 ficheroId, bytes32 ficheroHash) public returns (bool) 
{
    //comprueba que no exista ya
    require(ficheros[ficheroId].fecha == 0);
	
    ficheros[ficheroId].userAddress = msg.sender; //usuario que lanza la transaccion
    ficheros[ficheroId].fecha = now;
    ficheros[ficheroId].hash = ficheroHash;
    
    return true;
	    
    
}

//recupera un fichero
function getFichero(uint256 ficheroId) public view returns (address, uint256, bytes32 ) {

    //si no existe el fichero da error
    require(ficheros[ficheroId].fecha != 0);
    
    //si existe devuelve sus datos
    return (ficheros[ficheroId].userAddress, ficheros[ficheroId].fecha, ficheros[ficheroId].hash);
}

} //end contract