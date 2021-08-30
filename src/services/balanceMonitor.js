const config = require('config')
const tokenService = require('./token')

let monitorConfigJson
try {
    monitorConfigJson = require('../../monitor.json')
} catch (e) {
    throw new Error('Please config file in server root')
}

class BalanceMonitorService {
    monitorConfigs

    constructor() {
        this.monitorConfigs = monitorConfigJson
    }

    init () {
        this.monitorConfigs.forEach((monitorConfig) => {
            this.addMonitor(monitorConfig)
        })
    }

    addMonitor(monitorConfig) {
        const monitor = async () => {
            try {
                const balanceUSD = await tokenService.getBalanceUSD(
                    monitorConfig.tokenAddress, 
                    monitorConfig.accountAddress
                )
    
                if (balanceUSD < monitorConfig.balanceUSD) {
                    await notificationService.sendNotifcation(monitorConfig.accountAddress)
                }
            } catch (e) {
                console.error('Failed to poll', e)
            }
        }

        setInterval(monitor, config.get('pollInterval'))
    }
}

module.exports = new BalanceMonitorService()
