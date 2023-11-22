import { gql } from "@apollo/client";
import client from "./apolloClient"

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
        }`,
        fetchPolicy: "network-only",
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
    }`;
        
        try {
          const { data } = await client.mutate({
            mutation: gql`mutation createDeck($deckName: String!) {
                createDeck(deckName: $deckName) {
                  username
                }
              }`,
            variables: { deckName },
          });
          return data.createDeck;
        } catch (error) {
          console.error("Error creating deck:", error);
          throw error; 
        }
      },
    };