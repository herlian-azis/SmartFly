const converToNumber = require('../helpers/convertPrice')
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const url = 'https://www.pegipegi.com/tiket-pesawat/sys/search-results/CGK/DPS/24-08-2020/1/0/0'

let airline, price, airLineLogo, departureTime, arrivalTime
let dataJson = { airline: "", price: null, departureTime: "", arrivalTime: "", airLineLogo: "" }
let result = []

let getData = html => {
  const $ = cheerio.load(html)
  $('.detailOrderList').each((i, item) => {
    airline = $(item)
      .children('.firstMaskapai')
      .find('.second').text()
    dataJson.airline = airline

    airLineLogo = $(item)
      .children('.firstMaskapai')
      .find('.maskapaiLogo img').attr('src')
    let logo = ('https:' + airLineLogo)
    dataJson.airLineLogo = logo

    departureTime = $(item)
      .children('.rute')
      .find('.first').first().text()
    dataJson.departureTime = departureTime

    arrivalTime = $(item)
      .children('.rute')
      .find('.first').last().text()
    dataJson.arrivalTime = arrivalTime

    let priceBig = $(item)
      .children('.priceBottom')
      .find('.price-big').text()

    let priceNormal = $(item)
      .children('.priceBottom')
      .find('.price-normal').text()

    priceBig = (priceBig.replace('.', ''))
    priceNormal = (priceNormal.replace('.', ''))
    price = (priceBig + '' + priceNormal)

    price = converToNumber(price)
    dataJson.price = price

    result.push({ airline, departureTime, arrivalTime, price, airLineLogo })

  })
}
class PegiPegi {

  static async getPegipegi() {
    try {
      await nightmare
        .goto(url)
        .wait('body')
        .wait(1000)
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

module.exports = PegiPegi

