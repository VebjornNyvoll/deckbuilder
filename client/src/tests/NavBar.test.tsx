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
        console.log(store.getActions());
        
        expect(actions[0]).toEqual("fanottem")
        store.clearActions();
    });
    

    test("Test sort", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <NavBar />
                </Router>
            </Provider>
        );

        


  
    // Now click on 'High to low'
    const sortMenuItem = document.getElementById("sort-menuitem");
    console.log(sortMenuItem);
    
    if(sortMenuItem){
        fireEvent.mouseEnter(sortMenuItem);
        await wait(300)
    }else{
        console.log("No element sort menu item");
        
    }

    const attack = document.getElementById("attack");

    if(attack){
        fireEvent.mouseOver(attack);
        await wait(400);
    }else{
        console.log("No element attack");
        
    }

    const highToLowOption = document.getElementById('attack-htl');

    if(highToLowOption){
        
        fireEvent.mouseOver(highToLowOption);
        await wait(400)
        const actions = store.getActions();
        console.log(actions);
    }else{
        console.log("No attack high to low");
    }

   
    });
});





