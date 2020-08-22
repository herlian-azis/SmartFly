const request = require('supertest');
const app = require("../app.js")
const SearchModel = require("../models/search")



describe('Test Route GET /prediction/:departure/:arrival',() => {

  beforeAll((done) => {
    return SearchModel.insertOne({ departure: 'jakarta', arrival: 'bali', date: new Date().getDate() })
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  afterAll((done) => {
    return SearchModel.deleteAll
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('response(200) success get prediction - return prediction data', (done) => {
    const departure = "Jakarta"
    const arrival = "Bali"
    request(app)
    .get(`/pricePrediction/${departure}/${arrival}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(200)
      expect(body.slopeGraph).toEqual(expect.any(Number))
      expect(body.intercept).toEqual(expect.any(Number))
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(404) failed get prediction - return prediction data', (done) => {
    const departure = "kotalain"
    const arrival = "Bali"
    request(app)
    .get(`/pricePrediction/${departure}/${arrival}`)
    .set('Accept', 'application/json')
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(404)
      expect(body).toHaveProperty("message",'No Data Yet')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

})


describe('Test Route POST /saveSearch' , () => {
  afterAll((done) => {
    return SearchModel.deleteAll
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
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
      expect(body).toHaveProperty("message", 'Location is required')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })
})
