const { formatUnits } = require("@ethersproject/units")
const { ethers } = require("ethers")
const ERC20_ABI = require("../constants/abi/erc20.json")
const fuseswapGraph = require("./fuseswapGraph")
const provider = require("./provider")

class TokenService {
    async getBalanceUSD(tokenAddress, accountAddress) {
        const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
        const tokenBalance = await token.balanceOf(accountAddress)
        const tokenDecimals = await token.decimals()
        const price = await fuseswapGraph.getTokenPrice(tokenAddress)
        return Number(formatUnits(tokenBalance, tokenDecimals)) * price
    }
}

module.exports = new TokenService()