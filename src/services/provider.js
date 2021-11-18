const config = require('config')
const ethers = require('ethers')

module.exports = getProvider = (provider) => {
  return new ethers.providers.JsonRpcProvider(
    config.get(`networks.${provider}`)
  )
}
