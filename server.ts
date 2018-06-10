import { ApolloServer, gql, MockList } from 'apollo-server'
import { GraphQLScalarType, Kind } from 'graphql'
import casual from 'casual'

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  scalar Date

  type Book {
    title: String
    author: String
  }
  type Person {
    name: String
    age: Int
  }
  type Query {
    books: [Book]
    people: [Person]
    drink: Drink
  }
  type Drink {
    create: Date
  }
`
const resolvers = {
  Query: {
    books: () => books
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar type',
    parseValue: value => new Date(value), // from client
    serialize: value => value.getTime(), // sent to client
    parseLiteral: ast => {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10)
      }
      return null
    }
  })
}

const mocks = {
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0, 120)
  }),
  Query: () => ({
    people: () => new MockList([0, 12]),
    drink: () => ({
      create: () => new Date()
    })
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks
})

server.listen().then(({ url }) => {
  console.log('Server ready open', url)
})
