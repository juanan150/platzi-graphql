import { ApolloServer } from 'apollo-server'
import { loadFiles } from '@graphql-tools/load-files'
import resolvers from './resolvers'

;(async () => {
  const getDefs = async () => {
    const types = await loadFiles('src/**/*.graphql')
    return types
  }

  // 1- query
  const typeDefs = await getDefs()

  // 3 - start server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.listen().then(({ url }) => console.log(`Server running on ${url}`))
})()
