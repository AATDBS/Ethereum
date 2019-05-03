curl -X POST http://99.80.181.35:80/rpc \
-H "Content-Type: application/json" \
--data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'

curl -X POST http://99.80.181.35:80/rpc \
-H "Content-Type: application/json" \
--data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

