describe('DOM', () => {
  it('should render vote status buttons in the DOM of an already created repo', () => {
    // Need to yarnDevLocalTest and close and open cypress each time you run this test*****
    cy.login();

    // cy.findOrCreateUser() also stores user information in local storage for inject.js to refer to
    // so visiting the GitHub page of a created repo should show the vote status buttons
    cy.findOrCreateUser();

    // Inject needs owner and repo. It gets it from the url bar in production but in tests the url bar is different
    // We're setting it here for now until we figure out something more dynamic 
    window.localStorage.setItem('owner', Cypress.env('gitHubUsername'))
    window.localStorage.setItem('repo', Cypress.env('gitHubRepo'))

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
