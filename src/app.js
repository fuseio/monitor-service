const config = require('config')
const express = require('express')
const morgan = require('morgan')
const balanceMonitorService = require('./services/balanceMonitor')
const routes = require('./routes')

const app = express()

app.use(morgan('combined'))

app.set('port', config.get('api.port'))

app.use(routes)

app.use(function (err, req, res, next) {
    res.status(err.status || 5000)

    res.json({
        error: {
            code: err?.code,
            message: error?.message
        }
    })
})

app.listen(app.get('port'), function () {    
    balanceMonitorService.init()

    console.log('Listening on port ' + app.get('port'))
})
