const express = require('express')
const e = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () =>{
  console.log(`this application listening on port ${port}`)
})