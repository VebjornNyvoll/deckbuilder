import { afterAll, beforeAll, describe, test, vi, expect } from 'vitest';
import {ListItem} from "../components/CardItem";
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import client from "../service/apolloClient";
import Deck from  "../pages/Deck"


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


describe("Deck click test", async () => {
    test("Test deck", async () => {
        render(
            
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <Router>
                        <Deck></Deck>
                    </Router>
                </ApolloProvider>
            </Provider>
        )

        

        const newDeckButton = screen.getByTestId("newDeckButton");
        fireEvent.click(newDeckButton);

        const input = screen.getByPlaceholderText("Deck name");
        fireEvent.change(input, { target: { value: 'deckName' }});

        const createDeckButton = screen.getByTestId("createDeckButton");
        fireEvent.click(createDeckButton);
        
    })
} )



