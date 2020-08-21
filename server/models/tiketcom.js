const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const url = 'https://www.tiket.com/pesawat/search?d=SUBC&a=JKTC&dType=CITY&aType=CITY&date=2020-08-22&adult=1&child=0&infant=0&class=economy'
const fs = require('fs');

let airline, price
let dataJson = { airline: "", price: "" }
let result = []

const getData = html => {
  const $ = cheerio.load(html)
  $('.wrapper-flight-list').each((i, item) => {
    airline = $(item)
      .find('.text-marketing-airline').text()
    dataJson.airline = airline
    price = $(item)
      .find('.text-price').text()
    dataJson.price = price
    // console.log(i + 1, airline, price)
    result.push({ airline, price })
  })
}

class TikeCom {

  static async getTiketCom() {
    try {
      await nightmare

        .goto(url)
        .wait('body')
        .scrollTo(500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(1000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )

        .goto(url)
        .wait('body')
        .scrollTo(1500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(2000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(2500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(3000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(3500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(4000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(4500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(5000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(5500, 0)
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

module.exports = TikeCom




