const routes = require('express').Router()
const PredictionController = require("../controller/predictioncontroller")


routes.post('/saveSearch', PredictionController.saveSearch)



module.exports = routes
