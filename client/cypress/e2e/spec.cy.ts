describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/project2")
    cy.viewport(1920, 1080);
    cy.wait(1000);
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_5 > [aria-haspopup="true"]').click();
    cy.get('#pr_id_2_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('.text-center > .no-underline').click();
    cy.wait(500);
    cy.get('#username').clear('c');
    cy.get('#username').type('cypress@testing');
    cy.wait(500);
    cy.get('#password').clear('te');
    cy.get('#password').type('testing');
    cy.wait(500);
    cy.get('.p-checkbox-box').click();
    cy.wait(500);
    cy.get('.p-button-label').click();
    cy.wait(500);
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('.p-menuitem-link > .p-2').click();
    cy.wait(500);
    cy.get('#pr_id_44_content > .p-inputtext').clear('te');
    cy.get('#pr_id_44_content > .p-inputtext').type('testing deck');
    cy.wait(500);
    cy.get('.p-button-success > .p-button-label').click();
    cy.get('#pr_id_4_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(500);
    cy.get(':nth-child(1) > .p-4 > .p-button-rounded').click();
    cy.get('td > span').click();
    cy.wait(500);
    cy.get('#pr_id_4_4 > .p-inputtext').clear('V');
    cy.get('#pr_id_4_4 > .p-inputtext').type('Void Terror{enter}');
    cy.get(':nth-child(2) > .p-4 > :nth-child(1) > .flex-column > .w-9').click();
    cy.get('.p-dialog-header-icon').click();
    cy.wait(500);
    cy.get(':nth-child(2) > .p-4 > .p-button-rounded').click();
    cy.get('td > span').click();
    cy.get('.p-grid').click();
    cy.wait(500);
    cy.get('#pr_id_4_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('.p-menuitem-text > .w-full').click();
    cy.wait(500);
    cy.get('#pr_id_4_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_4_5 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('#pr_id_4_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_4_5 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('#pr_id_4_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#username').clear('te');
    cy.get('#username').type('cypress@testing');
    cy.wait(500);
    cy.get('#username').clear('cypress@testin');
    cy.get('#username').type('cypress@testing');
    cy.wait(500);
    cy.get('#password').clear('te');
    cy.get('#password').type('testing');
    cy.wait(500);
    cy.get('.p-button').click();
    cy.get('.p-menubar-root-list').click();
    cy.wait(500);
    cy.get('.p-inputtext').clear();
    cy.get('.p-inputtext').type('{enter}');
    cy.wait(500);
    cy.get('#pr_id_4_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('.p-menuitem-text > .w-full').click();
    cy.wait(500);
    cy.get('#pr_id_4_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_4_5 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('#pr_id_4_5_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.get('#pr_id_4_3 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(500);
    cy.get('#pr_id_4_3 > .p-menuitem-link > .p-menuitem-text').click();
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