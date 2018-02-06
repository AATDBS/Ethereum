#!/bin/sh
# script to start geth and start mining

LOGFILE=$HOME/mygeth.log

exec /home/jmmolino/mygeth_local.sh >> $LOGFILE 2>> $LOGFILE & echo 'PI:' $!
echo "waiting 30 secs for geth to start"
sleep 30
echo "blockNumber:"
geth --exec "eth.blockNumber" attach ipc:$HOME/.ethereum/private_network/geth.ipc console
echo starting miner ...
geth --exec "miner.start(2)" attach ipc:$HOME/.ethereum/private_network/geth.ipc console
