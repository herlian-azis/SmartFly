const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const SearchModel = require("./models/search")
const spawn = require("child_process").spawn
const PredictionController = require("./controller/predictioncontroller")
const routes = require('./routes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/pricePrediction/:departure/:arrival", (req,res) => {
  let departure = req.params.departure.toLowerCase()
  let arrival = req.params.arrival.toLowerCase()
  SearchModel.findAll(departure, arrival)
    .then((data) => {
      if(data.length === 0){
        res.status(404).json({message:"No Data Yet"})
      }
      else{
          let data2 = []
          let count = 1
          if(data.length === 1){
            data2.push(count)
          }
          else{
            for(let i = 1; i < data.length; i++){
              if(data[i].date == data[i-1].date){
                count += 1
                if(i === data.length -1){
                  data2.push(count)
                }
              }
              else{
                data2.push(count)
                count = 1
              }
            }
          }
          let data1 = Array.from(Array(data2.length),(_, index) => index + 1)
          const dataX = JSON.stringify(data1)
          const dataY = JSON.stringify(data2)
          var process = spawn('python3',["./helpers/machineLearning.py",dataX,dataY])
          process.stdout.on('data', function(data) {
            let accuracy = +data.toString().split(' ')[0]
            let slopeGraph = data.toString().split(' ')[1]
            let intercept = +data.toString().split(' ')[2]
            res.status(200).json({
              accuracy,
              slopeGraph: +slopeGraph.slice(1,slopeGraph.length-1),
              intercept});
            })
      }
    })
    .catch((err) => {
      res.status(500).json({message:"Internal Server Error"})
    })
})

app.use(routes)

app.listen(port,() => {
  console.log(`App listening to port ${port}`)
})
