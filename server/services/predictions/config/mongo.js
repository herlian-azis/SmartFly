const { MongoClient } = require("mongodb")
const databaseURL = process.env.DB_URL || 'mongodb://localhost:27017'
const databaseName = process.env.DB_NAME || 'SearchDB'


const client = new MongoClient(databaseURL, {useUnifiedTopology: true})
client.connect()


const db = client.db(databaseName)

module.exports = db
