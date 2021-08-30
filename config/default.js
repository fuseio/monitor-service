module.exports = {
    mongo: {
        debug: true,
        uri: 'mongodb://localhost/test'
    },
    graph: {
        fuseswapUrl: 'https://graph.fuse.io/subgraphs/name/fuseio/fuseswap'
    },
    rpcUrl: 'https://rpc.fuse.io',
    pollInterval: 3600000 // default 1 hour
}