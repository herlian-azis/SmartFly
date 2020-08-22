const SearchModel = require("../models/search")

class PredictionController {
  static saveSearch(req,res) {
    let departure = req.body.departure
    let arrival = req.body.arrival
    let dateNow = new Date()
    SearchModel.insertOne({ departure, arrival, date: dateNow.getDate() })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: "Internal Server Error"})
      })
  }
}

module.exports = PredictionController
