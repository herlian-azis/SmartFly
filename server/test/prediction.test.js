const request = require('supertest');
const app = require("../app.js")



describe('Test Route GET /prediction/:departure/:arrival',() => {
  test('response(200) success get prediction - return prediction data', (done) => {
    const departure = "Jakarta"
    const arrival = "Bali"
    request(app)
    .get(`/pricePrediction/${departure}/${arrival}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(200)
      expect(body.prediction.slope).toEqual(expect.any(Number))
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(400) failed get prediction - return prediction data', (done) => {
    const departure = ""
    const arrival = "Bali"
    request(app)
    .get(`/pricePrediction/${departure}/${arrival}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("message",'Departure location is required')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

})


describe('Test Route POST /saveSearch' , () => {
  test('response(200) success post search data - return message', (done) => {
    const addSearch = {departure: "Jakarta", arrival: "Bali"}
    request(app)
    .post(`/saveSearch`)
    .set('Accept', 'application/json')
    .send(addSearch)
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(201)
      expect(body).toHaveProperty("message", 'Success save Search Data')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(400) failed post search data - return message', (done) => {
    const addSearch = {departure: "", arrival: "Bali"}
    request(app)
    .post(`/saveSearch`)
    .set('Accept', 'application/json')
    .send(addSearch)
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
