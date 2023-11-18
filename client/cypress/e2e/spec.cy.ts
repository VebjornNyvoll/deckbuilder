describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/project2")
    /* ==== Generated with Cypress Studio ==== */
    cy.wait(1000);
    cy.get('#pr_id_2_5 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.get('#pr_id_2_5_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#username').clear('a');
    cy.get('#username').type('admin');
    cy.wait(1000);
    cy.get('#password').clear('a');
    cy.get('#password').type('admin');
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_2_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('.p-menuitem-text > .w-full').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_5 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.p-inputtext').clear('V');
    cy.get('.p-inputtext').type('Void Terror{enter}');
    cy.wait(1000);
    cy.get(':nth-child(2) > .p-4 > :nth-child(1) > .flex-column > .w-9').click();
    cy.wait(1000);
    cy.get('.p-dialog-header-icon > .p-icon').click();
    cy.wait(1000);
    cy.get('.p-inputtext').clear('{enter}');
    cy.get('.p-inputtext').type('{enter}');
    /* ==== End Cypress Studio ==== */
  })
})