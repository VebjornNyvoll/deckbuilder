import { gql } from '@apollo/client';
import client from './apolloClient';

export const DeckService = {
  getDecks: async () => {
    const { data } = await client.query({
      query: gql`
        query Decks {
          user {
            decks {
              deckName
              id
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
    return data.user.decks;
  },
  getCardsInDeck: async (getCardsInDeckId: string) => {
    const { data } = await client.query({
      query: gql`
        query GetCardsInDeck($getCardsInDeckId: ID!) {
          getCardsInDeck(id: $getCardsInDeckId) {
            id
            img
            name
            otherRaces
            playerClass
            race
            rarity
            spellSchool
            text
            type
            multiClassGroup
            mechanics {
              name
            }
            locale
            imgGold
            howToGetSignature
            howToGetGold
            howToGetDiamond
            howToGet
            flavour
            health
            faction
            durability
            elite
            dbfId
            cost
            collectible
            classes
            cardSet
            cardId
            attack
            artist
            armor
          }
        }
      `,
      variables: { getCardsInDeckId },
      fetchPolicy: 'network-only',
    });
    return data.getCardsInDeck;
  },

  deleteDeck: async (deckId: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RemoveDeck($deckId: String!) {
          removeDeck(deckId: $deckId) {
            decks {
              deckName
              id
            }
            error {
              message
            }
          }
        }
      `,
      variables: { deckId },
    });
    return data.removeDeck;
  },

  createDeck: async (deckName: string) => {
    gql`
      query Decks {
        user {
          decks {
            deckName
            id
          }
        }
      }
    `;

    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation createDeck($deckName: String!) {
            createDeck(deckName: $deckName) {
              username
            }
          }
        `,
        variables: { deckName },
      });
      return data.createDeck;
    } catch (error) {
      console.error('Error creating deck:', error);
      throw error;
    }
  },
};
