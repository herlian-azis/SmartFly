const db = require("../config/mongo")
const Search = db.collection("Search")
const { ObjectID } = require("mongodb")

class SearchModel {
  static findAll(departure,arrival) {
    return Search.find({departure: departure.toLowerCase(), arrival: arrival.toLowerCase()}).toArray()
  }

  static insertOne(newData) {
    return Search.insertOne(newData)
  }

  static deleteAll() {
    return Search.remove({})
  }
}

module.exports = SearchModel
