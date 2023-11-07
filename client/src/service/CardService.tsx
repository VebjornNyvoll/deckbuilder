import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:1001/Hearthstone",
    cache: new InMemoryCache(),
});

export const CardService = {
    getCards(limit: number, skip: number) {
        return client.query({
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
};