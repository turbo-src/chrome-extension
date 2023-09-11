describe('DOM', () => {
  // See cypress/support/commands.js
  // Functions which do not have front end logic are there
  // dom.cy.js runs them and checks the front end
  it('should render vote status buttons in the DOM of an already created repo', () => {
    cy.login();

    cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);

    // Check to see if vote status buttons all loaded
    cy.get('#turbo-src-btn-issue_6').should('be.visible');
    cy.get('#turbo-src-btn-issue_5').should('be.visible');
    cy.get('#turbo-src-btn-issue_4').should('be.visible');
    cy.get('#turbo-src-btn-issue_3').should('be.visible');
    cy.get('#turbo-src-btn-issue_2').should('be.visible');
    cy.get('#turbo-src-btn-issue_1').should('be.visible');
  });
});
