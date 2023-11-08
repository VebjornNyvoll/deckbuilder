import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/Hearthstone",
  cache: new InMemoryCache(),
});

export const CardService = {
  getCards(limit: number, skip: number) {
    return client
      .query({
        query: gql`
          query GetCards($limit: Int, $skip: Int) {
            getPaginatedCards(limit: $limit, skip: $skip) {
              cards {
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
              hasNextPage
            }
          }
        `,
        variables: {
          limit,
          skip,
        },
      })
      .then((result) => result.data.getPaginatedCards)
      .catch((error) => {
        console.error("Error fetching cards:", error);
        return [];
      });
  },
  getFilteredCards(field, options = {}) {

    const { limit, skip, value, sortBy } = options;

    let variables = { field }; 
  
    if (limit !== undefined) {
      variables.limit = limit;
    }
    if (skip !== undefined) {
      variables.skip = skip;
    }
    if (value !== undefined) {
      variables.value = value;
    }
    if (sortBy !== undefined) {
      variables.sortBy = sortBy;
    }
    return client
      .query({
        query: gql`
        query FilteredCards($field: String!, $limit: Int, $skip: Int, $value: String, $sortBy: Int) {
          filteredCards(field: $field, limit: $limit, skip: $skip, value: $value, sortBy: $sortBy) {
            cards {
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
            hasNextPage
          }
        }
        `,
        variables: variables,
      })
      .then((result) => result.data.filteredCards)
      .catch((error) => {
        console.error("Error fetching cards:", error);
        return [];
      });
  }
};
