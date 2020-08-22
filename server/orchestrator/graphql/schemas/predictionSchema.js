const { gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql `
  type Prediction {
    accuracy: Int
    slopeGraph: Int
    intercept: Int
  }

  extend type Query {
      predictions(departure: String, arrival: String): Prediction,
  }

  input SearchInput {
    departure: String!
    arrival: String!
  }

  type Search {
    departure: String!
    arrival: String!
  }

  extend type Mutation {
    addSearch(search: SearchInput) : Search
  }
`

const resolvers = {
  Query: {
    predictions: async (_, args) => {
      try {
        const departure = args.departure
        const arrival = args.arrival
        const prediction = await axios.get(`http://localhost:3002/pricePrediction/${departure}/${arrival}`)
        return prediction.data
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    addSearch: async (_,args) => {
      try {
        const searchToAdd = args.search
        const addToSearch = await axios.post(`http://localhost:3002/saveSearch`, searchToAdd)
        return searchToAdd
      } catch (error) {
        return error
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
