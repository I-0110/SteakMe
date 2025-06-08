const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    favoriteId: ID
    answers: [String]
  }

  type Priority {
    cost: Int!
    texture: Int!
    flavor: Int!
  }

  input PriorityInput {
    cost: Int!
    texture: Int!
    flavor: Int!
  }

  type Steak {
    _id: ID!
    name: String
    imageUrl: String
    priorities: Priority
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
    getRecommendation(priority: Priorityinput!, doneness: String!): [Steak]!  
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
