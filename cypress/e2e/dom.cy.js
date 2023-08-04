describe('DOM', () => {
  // NB - Need to yarnDevLocalTest and close and open cypress each time you run this test for DOM updates *****
  // If you have not yet created the repo, run createRepo.cy.js

  // See cypress/support/commands.js
  // Functions which do not have front end logic are there
  // dom.cy.js runs them and checks the front end
  it('should render vote status buttons in the DOM of an already created repo', () => {
    cy.login();

    // cy.findOrCreateUser() also stores user information in local storage for inject.js to refer to
    // so visiting the GitHub page of a created repo should show the vote status buttons
    cy.findOrCreateUser();

    cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);

    // Check to see if vote status buttons all loaded
    cy.get('#turbo-src-btn-issue_6').should('be.visible');
    cy.get('#turbo-src-btn-issue_5').should('be.visible');
    cy.get('#turbo-src-btn-issue_4').should('be.visible');
    cy.get('#turbo-src-btn-issue_3').should('be.visible');
    cy.get('#turbo-src-btn-issue_2').should('be.visible');
    cy.get('#turbo-src-btn-issue_1').should('be.visible');
    cy.get('#turbo-src-btn-issue_1').should('be.visible');
  });
});
