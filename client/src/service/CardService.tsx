import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/Hearthstone',
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
  getEmptyCard() {
    return {
      id: '',
      cardId: '',
      dbfId: 0,
      name: '',
      cardSet: '',
      type: '',
      text: '',
      playerClass: '',
      locale: '',
      faction: '',
      cost: 0,
      attack: 0,
      health: 0,
      flavour: '',
      artist: '',
      elite: false,
      rarity: '',
      spellSchool: '',
      race: '',
      img: '',
      durability: 0,
      collectible: false,
      imgGold: '',
      otherRaces: '',
      howToGetSignature: '',
      armor: 0,
      howToGet: '',
      howToGetGold: '',
      howToGetDiamond: '',
      classes: '',
      mechanics: [],
      flavor: '',
    };
  },
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
                attack
                health
                cost
                faction
                name
                img
                cardSet
                cardId
                id
                type
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
        console.error('Error fetching filtered cards:', error);
        return [];
      });
  },

  getCardById(cardId: string) {
    return client
      .query({
        query: gql`
          query GetCardById($id: ID!) {
            getCardById(id: $id) {
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
        variables: { id: cardId },
      })
      .then((result) => result.data.getCardById)
      .catch((error) => {
        console.error('Error fetching card by ID:', error);
        return null;
      });
  },
};
