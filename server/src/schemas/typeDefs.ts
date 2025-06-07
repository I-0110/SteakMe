const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    favoriteId: ID
    answers: [String]
  }

  type Answer {
    priority: String
    doneness: String
    recommendation: String
  }

  type Steak {
    _id: ID!
    name: String
    imageUrl: String
    priorities: [String]
    doneness: [String]
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    steaks: [Steak]
    users: [User]!
    user(userId: ID!): User
    me: User
    getRecommendation(priority: String!, doneness: String!): Steak  
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addFavorite(userId: ID!, favorite: String!): User
    removeUser: User
    removeFavorite(favorite: String!): User
  }
`;

export default typeDefs;
