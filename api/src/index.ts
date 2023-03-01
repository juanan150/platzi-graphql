import { ApolloServer } from 'apollo-server'
import { loadFiles } from '@graphql-tools/load-files'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const orm = new PrismaClient()

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
    context: { orm },
  })

  server.listen().then(({ url }) => console.log(`Server running on ${url}`))
})()
