import 'cypress-localstorage-commands';
import { env } from '../../custom.config';
describe('E2E test', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/').viewport(1920, 1080).wait(1000);
    cy.wait(500);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Reset current state of user', () => {
    cy.getToken(env.CUSTOM_TEST_USERNAME, env.CUSTOM_TEST_PASSWORD).then((response) => {
      cy.log('Response ' + response.error);
      if (!response.error) {
        cy.deleteCurrentUser(response.token);
      }
    });
    cy.clearLocalStorage();
  });

  it('signup', () => {
    cy.get('.p-menuitem-text').contains('Profile').click();
    cy.get('.p-menuitem-text').contains('Login').click();
    cy.get('a.font-medium.no-underline.ml-2.text-blue-500.cursor-pointer').contains('Create today!').click();
    cy.get('[data-testid="createAccountUsername"]').clear();
    cy.get('[data-testid="createAccountPassword"]').clear();
    cy.get('[data-testid="createAccountUsername"]').type(env.CUSTOM_TEST_USERNAME);
    cy.get('[data-testid="createAccountPassword"]').type(env.CUSTOM_TEST_PASSWORD);
    cy.get('.p-checkbox-box').click();
    cy.wait(500);
    cy.get('.p-button-label.p-c').contains('Create account').click();
    cy.wait(1000);
    cy.saveLocalStorage('SignupState');
  });

  it('test decks', () => {
    cy.restoreLocalStorage('SignupState');
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      cy.log('Generated jwt token: ' + token);
    });
    cy.get('.p-menuitem-text').contains('Decks').click();
    cy.wait(1000);
    cy.get('[data-testid="newDeckButton"] > .p-2').click();
    cy.wait(1000);
    cy.get('#deckName').clear();
    cy.get('#deckName').type('Testing deck');
    cy.wait(500);
    cy.get('[data-testid="createDeckButton"] > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#CFM_648tbtn > .p-button-icon').click();
    cy.wait(1000);
    cy.get('.p-button-sm').click();
    cy.wait(1000);
    cy.get('#pr_id_1_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_6 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_6_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
  });

  it('filters', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_1_2 > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_1 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_1_2 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_2_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_2_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_1 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_1_2 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_2_0_1 > .p-menuitem-link').click();
    cy.wait(1000);
  });
  it('sort', () => {
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_0_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_0_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_1 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('[data-testid="attack-htl"]').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_3 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_3_0 > .p-menuitem-link > .p-menuitem-icon').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_3 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_3_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('[data-testid="sort-menuitem"]').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_1 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_1_3_1_0 > .p-menuitem-link > .p-menuitem-icon').click();
    cy.wait(1000);
  });

  it('add card to deck', () => {
    cy.restoreLocalStorage('SignupState');
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.window().then((win) => {
      const event = new MouseEvent('mousemove', {
        clientX: 500, // Set x and y coordinates within the window
        clientY: 500,
        bubbles: true,
        cancelable: true,
      });
      win.document.dispatchEvent(event);
    });
    cy.get('.card').invoke('scrollTop', 2500);
    cy.wait(1000);
    cy.get('.p-scrolltop-icon').click();
    cy.wait(1000);
    cy.get('#TSC_955tbtn > .p-button-icon').click();
    cy.wait(1000);
    cy.get('.p-button-sm > .p-button-label').click();
    cy.wait(1000);
  });
  it('delete deck', () => {
    cy.restoreLocalStorage('SignupState');
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('[data-testid="newDeckButton"] > .p-2').click();
    cy.wait(500);
    cy.get('#deckName').type('DeleteDeckTest');
    cy.wait(500);
    cy.get('.p-dialog-header').click();
    cy.wait(1000);
    cy.get('[data-testid="createDeckButton"] > .p-button-icon').click();
    cy.wait(1000);
    cy.get('#TSC_955tbtn > .p-button-icon').click();
    cy.wait(1000);
    cy.get('button[aria-label="DeleteDeckTest"]').siblings('i.pi.pi-trash').click();
    cy.wait(1000);

    cy.get('#pr_id_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_1_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.get('#pr_id_1_6_2 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_1_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.get('#pr_id_1_6_3 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('.p-button-label').click();
    cy.get('[aria-haspopup="true"] > .p-menuitem-text').click();
    cy.get('#pr_id_1_6_2 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_1_6 > [aria-haspopup="true"]').click();
    cy.get('#pr_id_1_6_3 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    /* ==== End Cypress Studio ==== */
  });
});
