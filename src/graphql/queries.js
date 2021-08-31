exports.tokenPriceQuery = function tokenPriceQuery (address) {
  const normalizedAddress = address.toLowerCase()
  return `
          {
              bundle(id: "1") {
                  ethPrice
              }
              token(id: "${normalizedAddress}") {
                  name
                  symbol
                  derivedETH
              } 
          }
      `
}
