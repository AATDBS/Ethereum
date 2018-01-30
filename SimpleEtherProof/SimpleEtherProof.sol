pragma solidity ^0.4.18;

contract SimpleEtherProof {
    
    struct File {
        uint timestamp;
        uint blockNumber;
        address owner;
    }
    
    mapping (uint => File) Registry;
    
    function checkExistence(uint index) public constant returns (bool) {
        return Registry[index].timestamp != 0 && Registry[index].blockNumber != 0;
    }
    
    function addFile(uint index) public payable {
        require(msg.value==100000); 
        Registry[index] = File(now, block.number, msg.sender);
    }
    
    function getTimestamp(uint index) public constant returns(uint) {
        return Registry[index].timestamp;
    }
    
    function getBlockNumber(uint index) public constant returns(uint) {
        return Registry[index].blockNumber;
    }
}
