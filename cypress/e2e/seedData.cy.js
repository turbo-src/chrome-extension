describe('Seed data', () => {
  it('should create a user and a repo', () => {
    // See cypress/support/commands.js
    // If you have not created the repo, run this test before dom.cy.js
    cy.findOrCreateUser(
      Cypress.env('turbosrcID'),
      Cypress.env('owner'),
      Cypress.env('gitHubUsername'),
      Cypress.env('contributorID'),
      Cypress.env('gitHubUsername'),
      Cypress.env('contributorSignature'),
      Cypress.env('gitHubToken')
    );

    // Create demo repo
    cy.createRepo();
  });
});
