import { afterAll, beforeAll, describe, test, vi, expect } from 'vitest';
import {ListItem} from "../components/CardItem";
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import client from "../service/apolloClient";

const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});


const initialState = {
    filters: {},
    sort: {},
    layout: {
        layout: "grid" 
    },
    datasaver: {
        datasaver: false 
    },

    cards: {
        cards: [] 
    }

};
const mockStore = configureStore();
const store = mockStore(initialState);


function wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



interface CardItemProps {
    card: Card;
    onClick?: (cardId: string) => void;
  }
  interface Mechanic {
    name: string;
  }
  export interface Card {
    id: string;
    cardId: string;
    dbfId: number;
    name: string;
    cardSet: string;
    type: string;
    faction: string;
    rarity: string;
    cost: number;
    attack: number;
    health: number;
    text: string;
    flavor: string;
    artist: string;
    collectible: boolean;
    elite: boolean;
    playerClass: string;
    img: string;
    imgGold: string | undefined;
    locale: string;
    mechanics: Mechanic[];
  }

const mockupCard = {
    __typename: "Card",
    attack: 6,
    cardSet: "Mean Streets of Gadgetzan",
    cost: 6,
    faction: null,
    health: 6,
    id: "655caba86ead681c6450b0e7",
    img: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f8b2f6eef5466fb1fb0bed9cc06c667e032df2b847bc6b72fb1e3bca28b4c939.png",
    name: '"Little Friend"',
    type: "Minion"
}

describe("Card item test", async () => {
    test("popup test", async () => {
        render(
            
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <Router>
                        <ListItem card={mockupCard}></ListItem>
                    </Router>
                </ApolloProvider>
            </Provider>
        )

        const overlayButton = screen.getByTestId("overlayPanelButton");
        if(overlayButton){
            fireEvent.click(overlayButton);
        }else{
            console.log("Overlay button not found");
        }
        
        const panel = screen.getByTestId(mockupCard.id);
        expect(panel.innerHTML).toEqual("Loading decks...")
    })
} )




