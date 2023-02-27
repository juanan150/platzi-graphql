import { ApolloServer } from 'apollo-server'

// 1- query
const typeDefs = `
type Query {
  info: String!
}
`

// 2 - resolvers
const resolvers = {
  Query: {
    info: () => `This is the API for Platzi`,
  },
}

// 3 - start server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server running on ${url}`))
