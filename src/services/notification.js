const { default: axios } = require('axios')
const config = require('config')
const { BALANCE_TYPE } = require('../constants')

class NotifcationService {
  async sendNotification ({
    accountDescription,
    accountAddress,
    balanceType,
    balance,
    balanceLimit,
    tokenSymbol
  }) {
    const balancePrefix = balanceType === BALANCE_TYPE.BALANCE_USD ? '$' : ''
    const balanceSuffix = tokenSymbol || ''
    const text = `${accountDescription} - ${accountAddress} the balance is ${balancePrefix}${balance} ${balanceSuffix}, less than the limit of ${balancePrefix}${balanceLimit} ${balanceSuffix}.`

    // console.log(text)
    await axios.post(config.get('notificationUrl'), {
      text
    })
  }
}

module.exports = new NotifcationService()
