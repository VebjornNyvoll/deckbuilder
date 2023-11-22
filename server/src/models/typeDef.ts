const typeDefs = `
  type Query {
    user: User
    users: [User]
    cards: [Card]
    getPaginatedCards(limit: Int, skip: Int): PaginatedCards
    getReviewsByCardId(cardId: ID!): [Review]!
    filteredCards(filters: [FilterInput!], limit: Int, skip: Int, sortBy: SortInput): PaginatedCards
    getCardsInDeck(id: ID!): [Card]
    getCardById(id: ID!): Card
  }

  input FilterInput {
    field: String!
    value: String
    values: [String]
    gt: Int
    lt: Int
  }

  input SortInput {
    field: String!
    order: Int!
  }

  type PaginatedCards {
    cards: [Card]
    hasNextPage: Boolean
  }

  type Review {
    cardId: ID!
    text: String!
    rating: Int!
    user: User!
  }

  type User {
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
    deleteCurrentUser: User!
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
