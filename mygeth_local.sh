#!/bin/sh

# runs local geth node, running private blockchain
# blockchain data must be initialized in $HOME/.ethereum/private_network folder
# uses 1234 as networkid

geth --identity "localNode" --rpc --rpcaddr "0.0.0.0" --rpcport "8545" --rpccorsdomain "*" --datadir "$HOME/.ethereum/private_network" --port "30303" --nodiscover --rpcapi "db,eth,net,personal,web3" --networkid 1234

