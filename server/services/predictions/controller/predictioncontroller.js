const SearchModel = require("../models/search")

class PredictionController {
  static saveSearch(req,res) {
    let departure = req.body.departure
    let arrival = req.body.arrival
    let dateNow = new Date()
    if(departure === '' || arrival === ''){
      res.status(400).json({message: "Location is required"})
    }
    SearchModel.insertOne({ departure: departure.toLowerCase(), arrival: arrival.toLowerCase(), date: dateNow.getDate() })
      .then((data) => {
        res.status(201).json({message: 'Success save Search Data'})
      })
      .catch((err) => {
        res.status(500).json({message: "Internal Server Error"})
      })
  }
}

module.exports = PredictionController
