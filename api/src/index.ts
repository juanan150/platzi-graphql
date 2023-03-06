import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import express from 'express'
import path from 'path'
import { loadFiles } from '@graphql-tools/load-files'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const orm = new PrismaClient()

;(async () => {
  const app = express()
  const httpServer = http.createServer(app)

  app.use('/static', express.static(path.join(__dirname, '../public')))

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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql'
  })

  await new Promise<void>((resolve) =>
  httpServer.listen({port: 4000}, resolve)
  )
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})()
