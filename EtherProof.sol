pragma solidity ^0.4.18;

contract EtherProof {
    
    struct File {
        uint timestamp;
        uint blockNumber;
    }
    
    mapping (bytes32 => File) Registry;
    
    function checkExistence(bytes32 hash) public constant returns (bool) {
        return Registry[hash].timestamp != 0 && Registry[hash].blockNumber != 0;
    }
    
    function addFile(bytes32 hash) public payable {
        require(msg.value==100000); 
        Registry[hash] = File(now, block.number);
    }
    
    function getTimestamp(bytes32 hash) public constant returns(uint) {
        return Registry[hash].timestamp;
    }
    
    function getBlockNumber(bytes32 hash) public constant returns(uint) {
        return Registry[hash].blockNumber;
    }
}
