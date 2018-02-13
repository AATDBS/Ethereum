pragma solidity ^0.4.18;

contract FileRegister {
    
    address private creator;
    
    //constructor
    function FileRegister() public {
        creator = msg.sender; 
    }
    
    //Standard kill() function to recover funds 
    function kill() public { 
        if (msg.sender == creator)
            selfdestruct(creator);  // kills this contract and sends remaining funds back to creator
    }
    
    //struct for Fichero
    struct Fichero {
               address userAddress;    // usuario que registra el fichero
        uint timestamp;         // fecha cuando se registra el fichero
        uint blockNumber;       // numero de bloque de la transaccion
    }
    
    //internal arrays
    mapping (bytes32 => Fichero ) private ficheros ; // array de ficheros, se utiliza el hash como index
    
    //event
    event ficheroInfo(
               bytes32 ficheroHash
    );
    
    //crea un fichero
    function createFichero(bytes32 ficheroHash) public {
        
        require(ficheros[ficheroHash].timestamp == 0); //si no existe el fichero da error
        
        ficheros[ficheroHash] = Fichero( msg.sender, now, block.number);
               ficheroInfo(ficheroHash);
    }
    
    //recupera un fichero
    function getFichero(bytes32 ficheroHash) public view returns (address, uint, uint) {
        
        require(ficheros[ficheroHash].timestamp != 0); //si no existe el fichero da error
        
        return (ficheros[ficheroHash].userAddress, ficheros[ficheroHash].timestamp, ficheros[ficheroHash].blockNumber);
    }

} //end contract

