const converToNumber = require('../helpers/convertPrice')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')

const url = 'https://www.traveloka.com/en-id/flight/onewaysearch?ap=JKTA.SUB&dt=27-08-2020.NA&ps=1.0.0&sc=ECONOMY'
let airline, price, airLineLogo, departureTime, arrivalTime
let dataJson = { airline: "", price: null, departureTime: "", arrivalTime: "", airLineLogo:""}
let result = []

const getData = html => {
  const $ = cheerio.load(html)
  $('._2X4eq').each((i, item) => {
    airline = $(item)
      .find('._3gn1_')
      .children('._1KrnW').text()
    dataJson.airline = airline

    airLineLogo = $(item)
      .find('._2HE-b img').attr('src')
    dataJson.airLineLogo = airLineLogo

    departureTime = $(item)
      .find('._32ZNg')
      .children('._1KrnW').first().text()
    dataJson.departureTime = departureTime

    arrivalTime = $(item)
      .find('._1BA8z')
      .children('._32ZNg')
      .children('.jjGhl').last().text()
    dataJson.arrivalTime = arrivalTime

    price = $(item)
      .find('._27kIL').first().text()
    price = converToNumber(price)
    dataJson.price = price

    result.push({ airline, departureTime, arrivalTime, price, airLineLogo })
  })
}

class Traveloka {
  static async getTraveloka() {
    try {
      await nightmare
        .goto(url)
        .wait('body')
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .end()
        .then((res) => {
          getData(res)
        })
        .catch((err) => {
          console.log(err)
        })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}



module.exports = Traveloka