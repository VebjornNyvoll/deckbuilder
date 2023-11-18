describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/project2")
    /* ==== Generated with Cypress Studio ==== */
    cy.viewport(1920, 1080);
    cy.wait(1000);
    cy.get('#pr_id_2_5 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.get('#pr_id_2_5_0 > .p-menuitem-link').click();
    cy.wait(500);
    cy.get('#username').clear('a');
    cy.get('#username').type('admin');
    cy.wait(500);
    cy.get('#password').clear('a');
    cy.get('#password').type('admin');
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_2_1 > .p-menuitem-link').click();
    cy.wait(500);
    cy.get('.p-menuitem-text > .w-full').click();
    cy.wait(500);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_5 > [aria-haspopup="true"]').click();
    cy.wait(500);
    cy.get('#pr_id_2_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.p-inputtext').clear('V');
    cy.get('.p-inputtext').type('Void Terror{enter}');
    cy.wait(1000);
    cy.get(':nth-child(2) > .p-4 > :nth-child(1) > .flex-column > .w-9').click();
    cy.wait(500);
    cy.get('.p-dialog-header-icon > .p-icon').click();
    cy.wait(1000);
    cy.get('.p-inputtext').clear('{enter}');
    cy.get('.p-inputtext').type('{enter}');
    /* ==== End Cypress Studio ==== */
    cy.window().then((win) => {
      const event = new MouseEvent('mousemove', {
        clientX: 500, // Set x and y coordinates within the window
        clientY: 500,
        bubbles: true,
        cancelable: true,
      });
      win.document.dispatchEvent(event);
    });
    cy.wait(500);
    cy.get('.card').invoke('scrollTop', 2500);
    cy.wait(1000);
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.p-scrolltop-icon').click({ force: true });
    cy.wait(500);
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_3 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('.card').invoke('scrollTop', 2500);
    cy.wait(1000);
    cy.get('.p-scrolltop-icon').click();
    /* ==== End Cypress Studio ==== */
  })
})