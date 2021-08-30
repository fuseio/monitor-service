const { default: axios } = require("axios")
const config = require("config")

class NotifcationService {
    async sendNotification(accountAddress, balanceUSD) {
        await axios.post(config.get('notificationUrl'), { 
            message: `Account: ${accountAddress} less than $${balanceUSD} left.` 
        })
    }
}

module.exports = new NotifcationService()
