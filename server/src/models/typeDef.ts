const typeDefs = `
  type Query {
    user: User
    users: [User]
    cards: [Card]
    getPaginatedCards(limit: Int, skip: Int): PaginatedCards
    getReviewsByCardId(cardId: ID!): [Review]!
    filteredCards(limit: Int, skip: Int, field: String!, value: String, gt: Int, lt: Int, sortBy: Int): [Card]
  }

  type PaginatedCards {
    cards: [Card]
    hasNextPage: Boolean
  }
  
  type Review{
    cardId: ID!
    text: String!
    rating: Int!
    user: User!
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
    createUser(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    
    createDeck(deckName: String!): User!
    removeDeck(deckId: String!): User!
    addCards(cardIds: [ID!]!, deckId: ID!): User!
    removeCards(cardIds: [ID!]!, deckId: ID!): User!
    addReview(cardId: ID!, text: String!, rating: Int!): [Review]
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
