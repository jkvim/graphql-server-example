import { ApolloServer, gql, MockList } from 'apollo-server'
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
  }
`
const resolvers = {
  Query: {
    books: () => books
  }
}

const mocks = {
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0, 120)
  }),
  Query: () => ({
    people: () => new MockList([0, 12])
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks
})

server.listen().then(({ url }) => {
  console.log('Server ready', url)
})
