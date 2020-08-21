const request = require('supertest');
const app = require("../app.js")


describe('Test Route POST/ login', () => {
  test('response(200) success login - return accessToken', (done) => {
      const dataUser = { email:"abcde@gmail.com",password: "abcde"}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty("accessToken")
          done()
        })
        .catch((err)=>{
          done(err)
        })
      })
    test('response(404) failed login - Email Not Found', (done)=>{
      const dataUser = { email:"",password: "abcde"}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(404)
          expect(body).toHaveProperty("message",'Email not Found')
          done()
        })
        .catch((err)=>{
          done(err)
        })
    })
    test('response(400) failed login - Password Incorrect', (done)=>{
      const dataUser = { email:"abcde@gmail.com",password: ""}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty("message",'Password incorrect')
          done()
        })
        .catch((err)=>{
          done(err)
        })
    })
})


describe('Test Route POST /register', () => {
  test('response(200) success register - return userData', (done) => {
    const dataUser = { email:"abcde@gmail.com",password: "abcde", username:"qwoieuqwi"}
    request(app)
      .post('/register')
      .send(dataUser)
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("message", 'Success Create User')
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })
  test('response(400) failed register - Email Empty', (done)=>{
    const dataUser = { email:"",password: "abcde"}
    request(app)
      .post('/register')
      .send(dataUser)
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message",'Email is required')
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })
})
