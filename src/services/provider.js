const config = require('config')
const ethers = require('ethers')

const getProvider = (provider) => {
  return new ethers.providers.JsonRpcProvider(
    config.get(`networks.${provider}`)
  )
}
module.exports = getProvider
