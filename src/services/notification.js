const { default: axios } = require('axios')
const config = require('config')
const { BALANCE_TYPE } = require('../constants')

class NotifcationService {
  async sendNotification (accountAddress, accountDescription, balanceType, balance, balanceLimit, tokenSymbol) {
    const balancePrefix = balanceType === BALANCE_TYPE.BALANCE_USD ? '$' : ''
    const balanceSuffix = tokenSymbol ? ` ${tokenSymbol}` : ''
    const text = `${accountDescription} - ${accountAddress} the balance is ${balancePrefix}${balance}${balanceSuffix}, less than the limit of ${balancePrefix}${balanceLimit}${balanceSuffix}.`
    
    await axios.post(config.get('notificationUrl'), {
      text
    })
  }
}

module.exports = new NotifcationService()
