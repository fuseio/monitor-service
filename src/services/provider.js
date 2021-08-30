const config = require('config')
const ethers = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(config.get('rpcUrl'))

module.exports = provider
