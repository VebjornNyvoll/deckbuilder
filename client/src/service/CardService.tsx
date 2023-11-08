import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1001/Hearthstone",
  cache: new InMemoryCache(),
});

export const CardService = {
  getCards(limit: number, skip: number, field: string, value: string, gt: number, lt: number, sortBy: string) {
    return client
      .query({
        query: gql`
            query GetFilteredCards($limit: Int, $skip: Int, $field: String!, $value: String, $gt: Int, $lt: Int, $sortBy: String) {
                filteredCards(limit: limit, skip: skip, field: $field, value: $value, gt: $gt, lt: $lt, sortBy: $sortBy) {
                    id
                    cardId
                    dbfId
                    name
                    cardSet
                    type
                    text
                    playerClass
                    locale
                    faction
                    mechanics {
                      name
                    }
                    cost
                    attack
                    health
                    flavour
                    artist
                    elite
                    rarity
                    spellSchool
                    race
                    img
                    durability
                    collectible
                    imgGold
                    otherRaces
                    howToGetSignature
                    armor
                    howToGet
                    howToGetGold
                    howToGetDiamond
                    multiClassGroup
                    classes
                  }
                }
            `,
        variables: {
          limit,
          skip,
            field,
            value,
            gt,
            lt,
            sortBy,
        },
      })
      .then((result) => result.data.getPaginatedCards)
      .catch((error) => {
        console.error("Error fetching cards:", error);
        return [];
      });
  },
};
