const Traveloka = require('../models/traveloka')
const TiketCom = require('../models/tiketcom')
const PegiPegi = require('../models/pegipegi')

class FlightController {

  static async getFlightData(req, res) {
    try {
      const resTraveloka = await Traveloka.getTraveloka()
      const resTiketCom = await TiketCom.getTiketCom()
      const resPegiPegi = await PegiPegi.getPegipegi()
      const AllData = {
        Traveloka: resTraveloka,
        Tiket: resTiketCom,
        PegiPegi: resPegiPegi
      }
      res.send(AllData)
    } catch (error) {
      console.log(error)
    }
  }

  // static async getDataTiketCom (req, res) {
  //   try {
  //     const response = await TiketCom.getTiketCom()
  //     res.send(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // static async getPegipegi(req, res) {
  //   try {
  //     const response = await PegiPegi.getPegipegi()
  //     res.send(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

module.exports = FlightController