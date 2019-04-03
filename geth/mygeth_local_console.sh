#!/bin/sh

#attach to local geth node console

geth --datadir=$HOME/.ethereum/private_network attach ipc:$HOME/.ethereum/private_network/geth.ipc console
