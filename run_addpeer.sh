#!/bin/sh
# script to add Peers to geth
# resolves dns to ip

#hostname=ethereum1.dynamic-dns.net
hostname=ethereum1.dbslabs.es
enode='enode://3670edb768abe4c2465db8fff5bd30265df1f1855cd6e486b97cd5afa919fa34517e9b25ca698c49e09b407d22916f55f3c7faa40db9a94175e2ccdf4e232b0f@'
port=':30303'

echo Adding Peer $hostname ...
ip=`dig +short $hostname`
echo $hostname : $ip

if [ -n "$ip" ]; then    
    comienzo="'admin.addPeer("'"'
    fin='"'");'"

    geth --exec 'admin.addPeer("'$enode$ip$port'");' --datadir=$HOME/.ethereum/private_network attach ipc:$HOME/.ethereum/private_network/geth.ipc

else
    echo Could not resolve $hostname.
fi

hostname=ethereum2.dbslabs.es
enode='enode://4cd7d538cd1ed03c8535d1f1a2de0fa6ce5402e72c8f7532c519cbe65ea0056a570e7160a2210292e6e71f1c2871758219a1a982305e186a905f6f4c0484ce2f@'
port=':30303'

echo Adding Peer $hostname ...
ip=`dig +short $hostname`
echo $hostname : $ip

if [ -n "$ip" ]; then

    comienzo="'admin.addPeer("'"'
    fin='"'");'"

    geth --exec 'admin.addPeer("'$enode$ip$port'");' --datadir=$HOME/.ethereum/private_network attach ipc:$HOME/.ethereum/private_network/geth.ipc

else
    echo Could not resolve $hostname.
fi

geth --exec "net.peerCount" attach ipc:$HOME/.ethereum/private_network/geth.ipc console
geth --exec "admin.peers" attach ipc:$HOME/.ethereum/private_network/geth.ipc console




