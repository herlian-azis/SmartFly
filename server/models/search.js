const db = require("../config/mongo")
const Search = db.collection("Search")
const { ObjectID } = require("mongodb")

class SearchModel {
  static findAll() {
    return Search.find().toArray()
  }

  static insertOne(newData) {
    return Search.insertOne(newData)
  }
}

module.exports = SearchModel
