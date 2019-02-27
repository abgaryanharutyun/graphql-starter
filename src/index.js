import {
  GraphQLServer
} from 'graphql-yoga';

// Scalar types = String, Boolean, Inr, Float, ID
const users = [{
    id: '1',
    name: 'Harut',
    email: 'harut@gmail.com',
    age: 25
  },
  {
    id: '2',
    name: 'Harut1',
    email: 'harut1@gmail.com',
    age: 25
  }
];

const posts = [{
    id: '1',
    title: 'Harut',
    body: 'Harut',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'Harutqqqq',
    body: 'Harutqqqqq',
    published: true,
    author: '2',
  }
];

const comments = [{
    id: '1',
    text: 'first comment',
    author: '1',
    postId: '1',
  },
  {
    id: '5',
    text: 'first commentsss',
    author: '1',
    postId: '1',
  },
  {
    id: '2',
    text: 'first comment',
    author: '2',
    postId: '2',
  }
]
const typeDefs = `
  type Query {
    users(query: String): [User]!
    posts(query: String): [Post]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`

const Resolve = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'Harut',
        email: 'harut@tpl.com'
      }
    },
    users(parent, args, ctx, info) {
        return users
    },
    posts() {
      return posts
    },
    comments() {
      return comments
    }
  },
  
  Post: {
    author(parent, args, ctx, info) {
      return users.filter(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.postId === parent.id)
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.id === parent.id)
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
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