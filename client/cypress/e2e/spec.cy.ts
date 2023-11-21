describe("E2E test", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/project2")
    cy.viewport(1920, 1080);
    cy.wait(1000);
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_0_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_1 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2_2 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2_2 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_1 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_1_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_0_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_2_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_2 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_3 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_3_0 > .p-menuitem-link > .p-menuitem-icon').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3 > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_0 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_0 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_0_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3 > :nth-child(1) > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_1 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_3_1_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_4 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_4 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.text-center > .no-underline').click();
    cy.wait(1000);
    cy.get('#username').clear('cypress@testing');
    cy.get('#username').type('cypress@testing');
    cy.wait(500);
    cy.get('#password').clear('T');
    cy.get('#password').type('Test');
    cy.wait(500);
    cy.get('.p-checkbox-box').click();
    cy.wait(500);
    cy.get('.p-button').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#username').clear('cypress@testing');
    cy.get('#username').type('cypress@testing');
    cy.wait(500);
    cy.get('#password').clear('T');
    cy.get('#password').type('Test');
    cy.wait(500);
    cy.get('.p-button-label').click();
    cy.wait(500);
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.p-menuitem-link > .p-2').click();
    cy.wait(1000);
    cy.get('#pr_id_244_content > .p-inputtext').clear('TE');
    cy.get('#pr_id_244_content > .p-inputtext').type('Testing Deck');
    cy.wait(1000);
    cy.get('.p-button-success > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_4_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
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
    cy.get('.card').invoke('scrollTop', 2500);
    cy.wait(1000);
    cy.get('.p-scrolltop-icon').click();

  })
  after(() => {
    cy.deleteCurrentUser();
  });
})