import { GraphQLServer } from 'graphql-yoga';


// Scalar types = String, Boolean, Inr, Floor, ID

const typeDefs = `
  type Query {
    hello: String!
  }
`

const Resolve = {
  Query: {
    hello() {
      return 'sssss!'
    }
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: Resolve,
})


server.start(() => {
  console.log('start')
})