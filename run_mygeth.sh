#!/bin/sh

LOGFILE=/home/jmmolino/mygeth.log

exec /home/jmmolino/mygeth_local.sh >> $LOGFILE 2>> $LOGFILE & echo 'PI:' $!
echo "waiting 30 secs"
sleep 30
echo "blockNumber:"
geth --exec "eth.blockNumber" attach ipc:$HOME/.ethereum/private_network/geth.ipc console
geth --exec "miner.start(2)" attach ipc:$HOME/.ethereum/private_network/geth.ipc console
#geth --exec "eth.blockNumber" attach ipc:$HOME/.ethereum/private_network/geth.ipc console













