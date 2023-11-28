import {beforeEach} from "vitest";

describe('E2E test', () => {
  beforeEach(()=> {
    cy.visit('/').viewport(1920, 1080).wait(1000);
    cy.wait(500);
  });
  it('filters',() => {
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
  it('sort',()=> {
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
  it('login', ()=> {
    cy.get('[data-testid="loginUsername"]').clear('cypress@testing');
    cy.get('[data-testid="loginUsername"]').type('cypress@testing');
    cy.wait(500);
    cy.get('[data-testid="loginPassword"]').clear('T');
    cy.get('[data-testid="loginPassword"]').type('Test');
    cy.wait(500);
    cy.get('[data-testid="loginSubmit"]').click();
    cy.wait(1000);
  });
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
  it('test decks', ()=> {
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('[data-testid="newDeckButton"] > .p-2').click();
    cy.wait(1000);
    cy.get('#deckName').clear('T');
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
  it('add card to deck', ()=> {
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
  it('delete deck',()=>{
    cy.get('#pr_id_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('[data-testid="newDeckButton"] > .p-2').click();
    cy.wait(500);
    cy.get('#deckName').clear('D');
    cy.get('#deckName').type('Delete');
    cy.wait(500);
    cy.get('.p-dialog-header').click();
    cy.wait(1000);
    cy.get('[data-testid="createDeckButton"] > .p-button-icon').click();
    cy.wait(1000);
    cy.get('#TSC_955tbtn > .p-button-icon').click();
    cy.get('.p-row-odd > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.get('#deckMenu_1 > .card > .p-menuitem-link > .p-button-label').click();
    cy.get('#deckMenu_1 > .card > .pi').click();
    cy.get('.p-menuitem-link > .p-button-label').click();
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
  after(() => {
    cy.deleteCurrentUser();
  });
});
