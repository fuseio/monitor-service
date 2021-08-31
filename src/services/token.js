const { formatUnits, formatEther } = require('@ethersproject/units')
const { ethers } = require('ethers')
const { WFUSE } = require('../constants')
const ERC20_ABI = require('../constants/abi/erc20.json')
const fuseswapGraph = require('./fuseswapGraph')
const provider = require('./provider')

class TokenService {
  async getBalance (tokenAddress, accountAddress) {
    if (ethers.constants.AddressZero === tokenAddress) {
      const balance = await provider.getBalance(accountAddress)
      return Number(formatEther(balance))
    } else {
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
      const tokenBalance = await token.balanceOf(accountAddress)
      const tokenDecimals = await token.decimals()
      return Number(formatUnits(tokenBalance, tokenDecimals))
    }
  }

  async getBalanceUsd (tokenAddress, accountAddress) {
    const balance = await this.getBalance(tokenAddress, accountAddress)
    const price = await fuseswapGraph.getTokenPrice(this.getToken(tokenAddress))
    return balance * price
  }

  getToken (tokenAddress) {
    return ethers.constants.AddressZero === tokenAddress ? WFUSE : tokenAddress
  }
}

module.exports = new TokenService()
