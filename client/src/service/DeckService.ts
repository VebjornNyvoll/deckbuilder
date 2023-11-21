import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import client from "./apolloClient"

// DeckService will have three functions, getCardsInDeck, createDeck and deleteDeck
// getCardsInDeck will take in a deckId and return a list of cards
// createDeck will take in a string and return deckId
// deleteDeck will take in a deckId and return a boolean

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
        }`
        })
        return data.user.decks;},
    getCardsInDeck: async (getCardsInDeckId: string) => {
        const { data } = await client.query({
        query: gql`
            query GetCardsInDeck($getCardsInDeckId: ID!) {
        getCardsInDeck(id: $getCardsInDeckId) {
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
        variables: { getCardsInDeckId },
        });
        return data.getCardsInDeck;
    },
    
    deleteDeck: async (deckId: string) => {
        const { data } = await client.mutate({
        mutation: gql`
            mutation DeleteDeck($deckId: String!) {
            deleteDeck(deckId: $deckId)
            }
        `,
        variables: { deckId },
        });
        return data.deleteDeck;
    },


    createDeck: async (deckName: String) => {

        const GET_DECKS = gql`
        query Decks {
      user {
        decks {
          deckName
          id
        } 
      }
    }`;
        
        try {
          const { data } = await client.mutate({
            mutation: gql`mutation createDeck($deckName: String!) {
                createDeck(deckName: $deckName) {
                  username
                }
              }`,
            variables: { deckName },
            update: (cache, { data: { createDeck } }) => {
              const existingDecks = cache.readQuery({ query: GET_DECKS });
              if (existingDecks) {
                cache.writeQuery({
                  query: GET_DECKS,
                  data: {
                    user: {
                      ...existingDecks.user,
                      decks: [...existingDecks.user.decks, createDeck],
                    },
                  },
                });
              }
            },
          });
          return data.createDeck;
        } catch (error) {
          console.error("Error creating deck:", error);
          throw error; // or handle it as you see fit
        }
      },
    };