const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')

const url = 'https://www.traveloka.com/en-id/flight/onewaysearch?ap=JKTA.SUB&dt=27-08-2020.NA&ps=1.0.0&sc=ECONOMY'
let airline, price
let dataJson = { airline: "", price: "" }
let result = []

const getData = html => {
  const $ = cheerio.load(html)
  $('._2X4eq').each((i, item) => {
    airline = $(item)
      .find('._3gn1_')
      .children('._1KrnW').text()
    dataJson.airline = airline
    price = $(item)
      .find('._27kIL').first().text()
    dataJson.price = price
    result.push({ airline, price })
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
          console.log(res, 'ini result')
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