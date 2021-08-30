const { fuseswapClient } = require('../graphql/client')
const { tokenPriceQuery } = require('../graphql/queries')

class FuseswapGraphService {
    async getTokenPrice (address) {
        const query = tokenPriceQuery(address)
        const data = await fuseswapClient.request(query)
        return data?.bundle?.ethPrice * data?.token?.derivedETH
    }
}

module.exports = new FuseswapGraphService()