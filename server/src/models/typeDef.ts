const typeDefs = `
  type Query {
    user(id: ID): User
    users: [User]
  }

  type User{
    id: ID
    username: String
    decks: [Deck]
    error: Error!
  }

  type Deck{
    deckId: String
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
    login(username: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    token: String
    user: User
    error: Error!
  }

  type Error {
    message: String!
    error: Boolean!
  }

`;

export { typeDefs };
