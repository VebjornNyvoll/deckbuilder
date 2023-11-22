describe('E2E test', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/project2/');
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
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > .p-4 > .flex-column > .w-9').click();
    cy.wait(1000);
    cy.get('.p-dialog-header-icon > .p-icon > path').click();
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
    cy.wait(1000);
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_2 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .p-4 > .flex-column').click();
    cy.wait(1000);
    cy.get('.p-dialog-header-icon > .p-icon > path').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6 > [aria-haspopup="true"] > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_2 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('.p-menuitem-link > .p-2').click();
    cy.wait(1000);
    cy.get('#deckName').clear('T');
    cy.get('#deckName').type('Testing deck');
    cy.wait(500);
    cy.get('.p-button-success > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#CFM_648tbtn > .p-button-icon').click(); // a little friend
    cy.wait(1000);
    cy.get('.p-button-sm').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon > path').click();
    cy.wait(1000);
    cy.get('#TB_BaconShop_HP_041btn > .p-button-icon').click(); // a tale of kings
    cy.wait(1000);
    cy.get('.p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('.p-button-label').click();
    cy.wait(1000);
    cy.get('.p-menuitem-link > .p-2').click();
    cy.wait(1000);
    cy.get('#deckName').clear('A');
    cy.get('#deckName').type('A test');
    cy.wait(500);
    cy.get('.p-button-success > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#CFM_648tbtn').click(); // a litle friend
    cy.wait(1000);
    cy.get('.p-sortable-column').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon > path').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.p-menuitem-link > .p-2').click();
    cy.wait(1000);
    cy.get('#deckName').clear('D');
    cy.get('#deckName').type('Delete this deck');
    cy.wait(500);
    cy.get('.p-button-success > .p-button-label').click();
    cy.wait(1000);
    cy.get('#deckMenu_2 > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#OG_311btn').click();
    cy.wait(1000);
    cy.get('[data-pc-section="sort"]').click();
    cy.wait(1000);
    cy.get('.p-row-odd > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon').click();
    cy.wait(1000);
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#deckMenu_2 > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#deckMenu_2 > .card > .pi').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#pr_id_2_6 > [aria-haspopup="true"]').click();
    cy.wait(1000);
    cy.get('#pr_id_2_6_3 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('#pr_id_2_1 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#deckMenu_1 > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#TB_BaconShop_HP_041btn > .p-button-icon').click(); // a tale of kings
    cy.wait(1000);
    cy.get('.p-row-odd > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon > path').click();
    cy.wait(1000);
    cy.get('#deckMenu_1 > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get('.card').invoke('scrollTop', 9000);
    cy.wait(1000);
    cy.get('.card').invoke('scrollTop', 9000);
    cy.wait(1500);
    cy.get('.card').invoke('scrollTop', 9000);
    cy.wait(1000);
    cy.get(':nth-child(41) > .p-4 > :nth-child(3) > #TB_BaconUps_255btn > .p-button-icon').click(); // Acolyte of c'thun
    cy.wait(1000);
    cy.get(':nth-child(1) > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon > path').click();
    cy.wait(1000);
    cy.get('.p-scrolltop-icon').click();
    cy.wait(1000);
    cy.get('.p-inputtext').clear('V');
    cy.get('.p-inputtext').type('Void');
    cy.wait(500);
    cy.get('.p-inputtext').clear('Void');
    cy.get('.p-inputtext').type('Voidwalker');
    cy.wait(500);
    cy.get(':nth-child(1) > .p-4 > .flex-column > .w-9').click();
    cy.wait(1000);
    cy.get('.p-dialog-header-icon > .p-icon > path').click();
    cy.wait(1000);
    cy.get('#BG_CS2_065btn > .p-button-icon').click(); // Voidwalker
    cy.wait(1000);
    cy.get('.p-row-odd > :nth-child(2) > .p-button-sm > .p-button-label').click();
    cy.wait(1000);
    cy.get('.p-toast-icon-close > .p-icon > path').click();
    cy.wait(1000);
    cy.get('.p-overlaypanel-close > .p-icon').click();
    cy.wait(1000);
    cy.get('.p-inputtext').clear('Void');
    cy.wait(1000);
    cy.get('.p-menubar-root-list').click();
    cy.wait(1000);
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-text').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#deckMenu_1 > .card > .p-menuitem-link > .p-button-label').click();
    cy.wait(1000);
    cy.get('#deckMenu_1 > .card > .pi').click();
    cy.wait(1000);
    cy.get('.card > .pi').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link').click();
    cy.wait(1000);
    cy.get('#pr_id_2_1 > .p-menuitem-link > .p-menuitem-icon').click();
    cy.wait(1000);
    cy.get('#pr_id_2_0 > .p-menuitem-link > .p-menuitem-text').click();
    /* ==== End Cypress Studio ==== */
  });
  after(() => {
    cy.deleteCurrentUser();
  });
});
