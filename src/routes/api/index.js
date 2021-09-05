const { Router } = require('express')

const router = Router()

router.get('/health', (req, res) => {
    res.send({ response: 'ok' })
})

module.exports = router
