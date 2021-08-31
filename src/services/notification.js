const { default: axios } = require('axios')
const config = require('config')

class NotifcationService {
  async sendNotification (accountAddress, balance, accountDescription) {
    await axios.post(config.get('notificationUrl'), {
      text: `${accountDescription} - ${accountAddress} less than $${balance} left.`
    })
  }
}

module.exports = new NotifcationService()
