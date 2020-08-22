const request = require('supertest');
const app = require("../app.js")



describe('Test Route GET /flightPrice/:departure/:arrival/:date',() => {
  test('response(200) success get Data - return flightPrices data', (done) => {
    const departure = "Jakarta"
    const arrival = "Bali"
    const date = new Date()
    request(app)
    .get(`/flightPrice/${departure}/${arrival}/${date}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(200)
      expect(body.prices).toHaveProperty('Traveloka')
      expect(body.prices).toHaveProperty('Tiket')
      expect(body.prices).toHaveProperty('PegiPegi')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(400) failed get Data - return message', (done) => {
    const departure = ""
    const arrival = "Bali"
    const date = new Date()
    request(app)
    .get(`/flightPrice/${departure}/${arrival}/${date}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("message", 'Departure location is required')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })
})
