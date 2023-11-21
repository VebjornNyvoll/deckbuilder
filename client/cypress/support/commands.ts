/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
    namespace Cypress {
        interface Chainable {
            deleteCurrentUser: () => void;
        }
    }
}

Cypress.Commands.add("deleteCurrentUser", () => {
    cy.request({
        method: "POST",
        headers: {
            Authorization: `${localStorage.getItem("token")}`
        },
        url: "http://localhost:4000/graphql",
        body: {
            query: `mutation Mutation {
                deleteCurrentUser {
                    id
                    username
                }
            }`
        }
    }).then(response => {
        // Handle the response as needed
        if (response.body.data.deleteCurrentUser.error) {
            // Handle error case
            cy.log("Failed to delete user:", response.body.data.deleteCurrentUser.error.message);
        } else {
            cy.log("User deleted successfully:", response.body.data.deleteCurrentUser.username);
        }
    });
});

export {};