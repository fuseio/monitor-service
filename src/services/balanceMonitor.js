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
  init() {
    monitorConfigJson.forEach((monitorConfig) => {
      this.addMonitor(monitorConfig)
    })
  }

  addMonitor(monitorConfig) {
    const { accountAddress, tokenAddress, balanceLimit, balanceType, network } =
      monitorConfig
    const monitor = async () => {
      try {
        let balance = await tokenService.getBalance(
          tokenAddress,
          accountAddress,
          network
        )

        if (balanceType === BALANCE_TYPE.BALANCE_USD) {
          balance = await tokenService.balanceToUsd(balance, tokenAddress)
        }

        if (balance < balanceLimit) {
          await notificationService.sendNotification({
            balance,
            ...monitorConfig
          })
        }
      } catch (e) {
        console.error('Failed to poll', e)
      }
    }
    setInterval(monitor, config.get('pollInterval'))
  }
}

module.exports = new BalanceMonitorService()
