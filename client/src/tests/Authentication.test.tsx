import { describe, test, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '../service/apolloClient';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';
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
  deck: {
    triggerShowDeckEvent: false,
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('Authentication behaviours', async () => {
  test('Test create user behaviour', async () => {
    render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <CreateAccount></CreateAccount>
          </Router>
        </ApolloProvider>
      </Provider>,
    );

    const createAccountUsername = screen.getByTestId('createAccountUsername');
    const createAccountPassword = screen.getByTestId('createAccountPassword');
    const createAccountTOS = screen.getByTestId('createAccountTOS');
    const createAccountSubmit = screen.getByTestId('createAccountSubmit');
    const createAccountTOSA = screen.getByTestId('createAccountTOSA');
    const createAccountToast = screen.getByTestId('createAccountToast');
    fireEvent.click(createAccountTOSA);
    expect(
      createAccountToast.innerHTML.match(
        'Man skal ikke plage andre, man skal være grei og snill, og for øvrig kan man gjøre hva man vil.',
      ),
    ).toBeTruthy();
    fireEvent.change(createAccountUsername, { target: { value: 'username' } });
    fireEvent.change(createAccountPassword, { target: { value: 'password' } });
    expect(createAccountTOS.checked).toBeFalsy();
    fireEvent.change(createAccountTOS, { target: { checked: true } });
    expect(createAccountTOS.checked).toBeTruthy();
    fireEvent.click(createAccountSubmit);
    expect(createAccountUsername.value).toEqual('username');
    expect(createAccountPassword.value).toEqual('password');
  });

  test('Test create user behaviour', async () => {
    render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Login></Login>
          </Router>
        </ApolloProvider>
      </Provider>,
    );

    const username = screen.getByTestId('loginUsername');
    const password = screen.getByTestId('loginPassword');
    const forgotPassword = screen.getByTestId('loginForgotPassword');
    const loginSubmit = screen.getByTestId('loginSubmit');
    const loginToast = screen.getByTestId('loginToast');

    fireEvent.click(forgotPassword);
    expect(loginToast.innerHTML.match('✨No worries, you can just make a new account!✨')).toBeTruthy();

    fireEvent.change(username, { target: { value: 'username' } });
    fireEvent.change(password, { target: { value: 'password' } });

    expect(username.value).toEqual('username');
    expect(password.value).toEqual('password');

    fireEvent.click(loginSubmit);
    console.log(loginToast.innerHTML);
  });
});

describe('Create accoutn page matches snapshot', async () => {
  test('snapshot test', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <CreateAccount></CreateAccount>
          </Router>
        </ApolloProvider>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
