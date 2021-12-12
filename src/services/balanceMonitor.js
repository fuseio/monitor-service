const config = require('config')
const { BALANCE_TYPE } = require('../constants')
const tokenService = require('./token')
const notificationService = require('./notification')
const axios = require('axios')

let monitorConfigJson
try {
  monitorConfigJson = require('../../monitor.json')
} catch (e) {
  throw new Error('Please config file in server root')
}
class BalanceMonitorService {
  init () {
    monitorConfigJson.forEach((account) => {
      this.addMonitor(account)
    })
  }

  addMonitor (account) {
    const { accountAddress, endpoint, role } = account
    const monitor = async () => {
      try {
        if (endpoint) {
          const accounts = await this._fetchAccounts(endpoint)

          for (const { address } of accounts) {
            await this._getBalance(account, address)
          }
        } else {
          await this._getBalance(account, accountAddress)
        }
      } catch (e) {
        console.error('Failed to poll', e)
      }
    }
    setInterval(monitor, config.get('pollInterval'))
  }

  async _getBalance (account, accountAddress) {
    const { tokenAddress, balanceLimit, balanceType, network } = account
    let balance = await tokenService.getBalance({
      tokenAddress,
      accountAddress,
      network
    })
    if (balanceType === BALANCE_TYPE.BALANCE_USD) {
      balance = await tokenService.balanceToUsd(balance, tokenAddress)
    }
    if (balance < balanceLimit) {
      await notificationService.sendNotification({
        balance,
        ...account
      })
    }
  }

  async _fetchAccounts (url) {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${config.get('token')}` }
    })
    return data
  }
}

module.exports = new BalanceMonitorService()
