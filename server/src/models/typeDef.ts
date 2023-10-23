const typeDefs = `
  type Query {
    user(id: ID): User
    users: [User]
  }

  type User{
    id: ID
    username: String
    password: String
    decks: [Deck]
  }

  type Deck{
    deckId: String
  }

  type Mutation {
    createUser(username: String, password: String): User
  }
`;

export {typeDefs};