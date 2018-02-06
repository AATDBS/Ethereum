#!/bin/sh
# script to add Peers to geth
# resolves dns to ip

hostname=ethereum1.dynamic-dns.net
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

hostname=ethereum2.dynamic-dns.net
enode='enode://3670edb768abe4c2465db8fff5bd30265df1f1855cd6e486b97cd5afa919fa34517e9b25ca698c49e09b407d22916f55f3c7faa40db9a94175e2ccdf4e232b0f@'
port=':30303'

echo Adding Peer $hostname ...
ip=`dig +short $hostname`
echo $hostname : $ip

if [ -n "$ip" ]; then
    enode='enode://3670edb768abe4c2465db8fff5bd30265df1f1855cd6e486b97cd5afa919fa34517e9b25ca698c49e09b407d22916f55f3c7faa40db9a94175e2ccdf4e232b0f@'
    port=':30303'
    comienzo="'admin.addPeer("'"'
    fin='"'");'"

    geth --exec 'admin.addPeer("'$enode$ip$port'");' --datadir=$HOME/.ethereum/private_network attach ipc:$HOME/.ethereum/private_network/geth.ipc

else
    echo Could not resolve $hostname.
fi

