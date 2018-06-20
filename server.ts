import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    hello: DogCommand,
  }
  enum DogCommand { SIT, DOWN, HEEL }
`
const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
 console.log('Server ready', url)
})