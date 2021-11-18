module.exports = {
  api: {
    port: 3000
  },
  mongo: {
    debug: true,
    uri: 'mongodb://localhost/test'
  },
  graph: {
    fuseswapUrl: 'https://graph.fuse.io/subgraphs/name/fuseio/fuseswap'
  },
  pollInterval: 3600000,
  networks: {
    fuse: 'https://rpc.fuse.io/',
    bsc: 'https://bsc-dataseed.binance.org/'
  }
}
