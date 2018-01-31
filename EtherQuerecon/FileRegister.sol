pragma solidity ^0.4.18;

contract FileRegister{
    
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
	address userAddress;    // usuario que registra el fichero
    uint fecha;             // fecha cuando se registra el fichero
}

//internal arrays
mapping (bytes32 => Fichero ) private ficheros ; // array de ficheros, se utiliza el hash como index

//crea un fichero
function createFichero(bytes32 ficheroHash) public returns (bool) 
{
    //comprueba que no exista ya
    require(ficheros[ficheroHash].fecha == 0);
	
    ficheros[ficheroHash].userAddress = msg.sender; //usuario que lanza la transaccion
    ficheros[ficheroHash].fecha = now;
    
    return true;	        
}

//recupera un fichero
function getFichero(bytes32 ficheroHash) public view returns (address, uint256) {

    //si no existe el fichero da error
    require(ficheros[ficheroHash].fecha != 0);
    
    //si existe devuelve sus datos
    return (ficheros[ficheroHash].userAddress, ficheros[ficheroHash].fecha);
}

} //end contract
