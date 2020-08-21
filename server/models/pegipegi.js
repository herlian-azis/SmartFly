const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const url = 'https://www.pegipegi.com/tiket-pesawat/sys/search-results/CGK/DPS/24-08-2020/1/0/0'

let airline, price
let dataJson = { airline: "", price: "" }
let result = []

let getData = html => {
  const $ = cheerio.load(html)
  $('.detailOrderList').each((i, item) => {
    airline = $(item)
      .children('.firstMaskapai')
      .find('.second').text()
    dataJson.airline = airline

    let priceBig = $(item)
      .children('.priceBottom')
      .find('.price-big').text()

    let priceNormal = $(item)
      .children('.priceBottom')
      .find('.price-normal').text()
    price = (priceBig + '' + priceNormal)
    dataJson.price = price
    result.push({ airline, price })

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

