import { GraphQLServer } from 'graphql-yoga';


// Scalar types = String, Boolean, Inr, Float, ID

const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`

const Resolve = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return "Hart"
    },
    age() {
      return 12
    },
    employed() {
      return true
    },
    gpa() {
      return 3.15
    },
    me() {
      return {
        id: '123',
        name: 'Harut',
        email: 'harut@tpl.com'
      }
    }
  },
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: Resolve,
})


server.start(() => {
  console.log('start')
})