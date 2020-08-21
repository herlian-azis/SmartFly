const router = require('express').Router()
const flightControllers = require('../controllers/flightControllers')

router.get('/flightPrice', flightControllers.getFlightData)

module.exports = router;