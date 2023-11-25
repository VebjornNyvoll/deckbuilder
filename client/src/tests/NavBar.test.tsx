import { describe, test, expect, } from 'vitest';
import NavBar from '../components/Navbar';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import jsdom from 'jsdom';

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('error', () => {
  // No-op to skip console errors.
});

const initialState = {
  filters: {},
  sort: {},
  layout: {
    layout: 'grid',
  },
  datasaver: {
    datasaver: false,
  },

  cards: {
    cards: [],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

describe('Navbar test', async () => {
  test('Test search query', async () => {
    render(
      <Provider store={store}>
        <Router>
          <PrimeReactProvider>
            <NavBar />
          </PrimeReactProvider>
        </Router>
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'fanottem' } });
    await wait(400);
    const expectedPayload = {
      type: 'filters/addFilter',
      payload: { field: 'name', values: ['fanottem'] },
    };
    const actions = store.getActions()[0];
    expect(actions).toEqual(expectedPayload);
    store.clearActions();
  });

  test('Test sort', async () => {
    render(
      <Provider store={store}>
        <Router>
          <PrimeReactProvider>
            <NavBar />
          </PrimeReactProvider>
        </Router>
      </Provider>,
    );

    const sortMenuItem = screen.getByTestId('sort-menuitem');
    if (sortMenuItem) {
      fireEvent.click(sortMenuItem);
      await wait(300);
    } else {
      console.log('No element sort menu item');
    }

    const attack = screen.getByTestId('attack');

    if (attack) {
      fireEvent.click(attack);
      await wait(400);
    } else {
      console.log('No element attack');
    }

    const highToLowOption = screen.getByTestId('attack-htl');

    if (highToLowOption) {
      fireEvent.click(highToLowOption);
      await wait(400);
      const expectedPayload = { type: 'sort/sort', payload: { field: 'attack', order: -1 } };
      const actions = store.getActions()[0];
      expect(actions).toEqual(expectedPayload);
    } else {
      console.log('No attack high to low');
    }
  });
});
