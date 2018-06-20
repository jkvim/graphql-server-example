const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';

const posts = [
  {
    author: 'Dog',
    comment: 'wow!'
  },
  {
    author: 'Bear',
    comment: 'aaa!',
  },
  {
    author: 'Cat',
    comment: 'meaw',
  }
]

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }
  type Query {
    posts: [Post]
  }
  type Mutation {
    addPost(author: String, comment: String): Post
  }
  type Post {
    author: String
    comment: String
  }
`
const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      posts.push(args)
      return args
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server ready open', url)
})
