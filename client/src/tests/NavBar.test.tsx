import { afterAll, beforeAll, describe, test, vi, expect } from 'vitest';
import NavBar from "../components/Navbar";
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

const initialState = {
    filters: {},
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



describe("Navbar test", async () => {
    test("Test search query", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <NavBar />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByPlaceholderText("Search");
        fireEvent.change(inputElement, { target: { value: 'fanottem' }});
        await wait(400)
        const actions = store.getActions()[0].payload.values
        expect(actions[0]).toEqual("fanottem")
    });



    test("Test search query", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <NavBar />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByPlaceholderText("Search");
        fireEvent.change(inputElement, { target: { value: 'fanottem' }});
        await wait(400)
        const actions = store.getActions()[0].payload.values
        expect(actions[0]).toEqual("fanottem")
    });
});





