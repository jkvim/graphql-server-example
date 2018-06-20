const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling'
  },
  {
    title: 'SICP',
    author: 'Harold Abelson'
  },
  {
    title: 'CSAPP',
    author: 'Randal Bryant'
  }
]

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    getBook(title: String): Book
  }
`
const resolvers = {
  Query: {
    getBook: (_, { title }) => {
      return books.find(book => book.title === title);
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server ready open', url)
})
