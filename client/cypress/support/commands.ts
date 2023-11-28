/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      deleteCurrentUser: () => void;
    }
  }
}

Cypress.Commands.add('deleteCurrentUser', () => {
  cy.request({
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
    url: 'http://localhost:4000/graphql',
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

export {};
