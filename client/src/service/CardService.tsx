import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/Hearthstone",
  cache: new InMemoryCache(),
});

interface Filter {
  field?: string;
  values?: string[];
}

interface Options {
  limit?: number;
  skip?: number;
  sortBy?: { field: string; order: number };
}

export const CardService = {
    getFilteredCards(filters: Filter, options: Options = {}) {
      const { limit, skip, sortBy } = options;

      const filterVariables = Object.entries(filters).map(([field, values]) => ({
        field,
        values,
      }));

      const variables = {
        filters: filterVariables,
        limit,
        skip,
        sortBy,
      };

      return client
        .query({
          query: gql`
            query FilteredCards($filters: [FilterInput!], $limit: Int, $skip: Int, $sortBy: SortInput) {
              filteredCards(filters: $filters, limit: $limit, skip: $skip, sortBy: $sortBy) {
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
                }
                hasNextPage
              }
            }
          `,
          variables,
        })
        .then((result) => {
          // Dispatch the filteredCards action with the retrieved data
          // Currently not supported in our redux implementation
          // dispatch(filteredCards(result.data.filteredCards));
          return result.data.filteredCards;
        })
        .catch((error) => {
          console.error("Error fetching filtered cards:", error);
          return [];
        });
    },
};
