pragma solidity ^0.5.0;

contract EntityContract{
    
address payable private creator;    

//constructor
constructor() public 
{
    creator = msg.sender; 
}

//Standard kill() function to recover funds 
function kill() public
{ 
    if (msg.sender == creator)
        selfdestruct(creator);  // kills this contract and sends remaining funds back to creator
}

//struct for Entity
struct Entity {
	string entityAddress;   // entity address
	string name;        // entity name
	address userAddress;    // user address that registered this entity
    uint dataTime;          // timestamp when this entity was registered
}
//internal arrays
mapping (string => Entity ) private entities ; // array of entities

//crea una entidad
function createEntity(string memory entityAddress, string memory entityName) public returns (bool) 
{
    //comprueba que no exista ya
    //recupera la entidad
    Entity memory a = entities[entityAddress];
    //si existe da error
    require(a.dataTime == 0);
    
	//crea la entidad
	entities[entityAddress].name = entityName; 
	entities[entityAddress].dataTime = now; //tiempo de creacion
    entities[entityAddress].userAddress = msg.sender; //usuario que lanza la transaccion
    
    return true;
}

//recupera los datos de una entidad
function getEntity(string memory entityAddress) public view returns (string memory, uint , address ) {

    //si no existe da error
    require(entities[entityAddress].dataTime != 0);
    
    //si existe devuelve sus datos
    return (entities[entityAddress].name , entities[entityAddress].dataTime,entities[entityAddress].userAddress);
}


} //end contract
