const config = require('config')
const { BALANCE_TYPE } = require('../constants')
const tokenService = require('./token')
const notificationService = require('./notification')

let monitorConfigJson
try {
  monitorConfigJson = require('../../monitor.json')
} catch (e) {
  throw new Error('Please config file in server root')
}

class BalanceMonitorService {
  init () {
    monitorConfigJson.forEach((monitorConfig) => {
      this.addMonitor(monitorConfig)
    })
  }

  addMonitor ({
    accountDescription,
    tokenAddress,
    accountAddress,
    balanceType,
    balanceUsdLimit,
    balanceLimit
  }) {
    const monitor = async () => {
      try {
        if (balanceType === BALANCE_TYPE.BALANCE_USD) {
          const balanceUsd = await tokenService.getBalanceUsd(
            tokenAddress,
            accountAddress
          )

          if (balanceUsd < balanceUsdLimit) {
            await notificationService.sendNotifcation(
              accountAddress,
              balanceUsd,
              accountDescription
            )
          }
        } else if (balanceType === BALANCE_TYPE.BALANCE) {
          const balance = await tokenService.getBalance(
            tokenAddress,
            accountAddress
          )

          if (balance < balanceLimit) {
            await notificationService.sendNotification(
              accountAddress,
              balance,
              accountDescription
            )
          }
        }
      } catch (e) {
        console.error('Failed to poll', e)
      }
    }

    setInterval(monitor, config.get('pollInterval'))
  }
}

module.exports = new BalanceMonitorService()
