const Traveloka = require('../models/traveloka')
const TiketCom = require('../models/tiketcom')
const PegiPegi = require('../models/pegipegi')

class FlightController {

  static async getFlightData(req, res) {
    try {
      const resTraveloka = await Traveloka.getTraveloka()
      console.log('Traveloka')
      const resTiketCom = await TiketCom.getTiketCom()
      console.log('Tiket')
      const resPegiPegi = await PegiPegi.getPegipegi()
      console.log('Pegipegi')
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

}

module.exports = FlightController