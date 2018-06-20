const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    like: 1,
  },
  {
    title: 'SICP',
    author: 'Harold Abelson',
    like: 2,
  },
  {
    title: 'CSAPP',
    author: 'Randal Bryant',
    like: 3,
  }
]

const typeDefs = gql`
  type Book {
    title: String
    author: String,
    like: Int
  }
  type Query {
    getBook(title: String): Book
  }
  type Mutation {
    likeBook(title: String!): Book,
    addBook(book: BookInput!): [Book]
  }
  input BookInput {
    title: String!,
    author: String!
  }
`
const resolvers = {
  Query: {
    getBook: (_, { title }) => {
      return books.find(book => book.title === title);
    }
  },
  Mutation: {
    likeBook: (_, { title }) => {
      const book = books.find(book => book.title === title)
      if (book) {
        book.like += 1;
        return book;
      }
    },
    addBook: (_, { book }) => {
      book.like = 0;
      books.push(book)
      return books
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server ready open', url)
})
