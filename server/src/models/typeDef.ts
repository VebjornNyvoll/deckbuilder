const typeDefs = `
  type Query {
    user(id: ID): User
    users: [User]
    cards: [Card]
    getPaginatedCards(limit: Int, skip: Int): PaginatedCards
  }

  type PaginatedCards {
    cards: [Card]
    hasNextPage: Boolean
  }

  type User{
    id: ID
    username: String
    decks: [Deck]
    error: Error!
  }

  type Deck {
    id: ID!
    deckName: String!
    cards: [Card]
  }
  
  type Mutation {
    createUser(username: String!, password: String!): User!
    login(username: String!, password: String!): AuthPayload!

    createDeck(deckName: String!): User!
    removeDeck(deckId: String!): User!
    addCards(cardIds: [ID!]!, deckId: ID!): User!
    removeCards(cardIds: [ID!]!, deckId: ID!): User!
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

  type Card {
    id: ID
    cardId: String
    dbfId: Int
    name: String
    cardSet: String
    type: String
    text: String
    playerClass: String
    locale: String
    faction: String
    mechanics: [Mechanics]
    cost: Int
    attack: Int
    health: Int
    flavour: String
    artist: String
    elite: Boolean
    rarity: String
    spellSchool: String
    race: String
    img: String
    durability: Int
    collectible: String
    imgGold: String
    otherRaces: String
    howToGetSignature: String
    armor: String
    howToGet: String
    howToGetGold: String
    howToGetDiamond: String
    multiClassGroup: String
    classes: [String]
  }

  type Mechanics {
    name: String
  }

`;

export { typeDefs };
