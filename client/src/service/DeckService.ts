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
    createDeck: async (deckName: string) => {
        const { data } = await client.mutate({
        mutation: gql`
            mutation CreateDeck($deckName: String!) {
                createDeck(deckName: $deckName) {
                    id
        }
        }
        `,
        variables: { deckName },
        });
        return data.createDeck.id;
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
    };