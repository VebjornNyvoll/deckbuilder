import { env } from '../../custom.config';

/// <reference types="cypress" />
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      deleteCurrentUser: (token: string) => Chainable<Element>;
      getToken: (username: string, password: string) => Chainable<{ token: string; error: boolean }>;
    }
  }
}

Cypress.Commands.add('deleteCurrentUser', (token: string) => {
  cy.request({
    method: 'POST',
    headers: {
      Authorization: `${token}`,
    },
    url: env.REACT_APP_BACKEND_URL,
    body: {
      query: `mutation Mutation {
                deleteCurrentUser {
                    id
                    username
                }
            }`,
    },
  }).then((response) => {
    // Handle the response as needed
    if (response.body.data.deleteCurrentUser.error) {
      // Handle error case
      cy.log('Failed to delete user:', response.body.data.deleteCurrentUser.error.message);
    } else {
      cy.log('User deleted successfully:', response.body.data.deleteCurrentUser.username);
    }
  });
});
Cypress.Commands.add('getToken', (username, password) => {
  return cy
    .request({
      method: 'POST',
      url: env.REACT_APP_BACKEND_URL,
      body: {
        query: `
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            error {
              error
              message
            }
          }
        }`,
        variables: {
          username: username,
          password: password,
        },
      },
    })
    .then((response) => {
      if (response.body.data.login.error.error) {
        return { token: null, error: true };
      } else {
        return { token: response.body.data.login.token, error: false };
      }
    });
});

export {};
