const mongoose = require('mongoose')
const config = require('config')
const balanceMonitorService = require('./services/balanceMonitor')

async function main() {
    mongoose.set('debug', config.get('mongo.debug'))
    mongoose.connect(config.get('mongo.uri')).catch((error) => {
        console.error(error)
        process.exit(1)
    })
    
    balanceMonitorService.init()

    console.log('Fuse Monitering Service...')
}

main()
