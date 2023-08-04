describe('Extension', () => {
    it('should visit the home page', () => {
      cy.visit(`http://localhost:5001/popup.html`);
      cy.get(':nth-child(1) > .Home__GithubLink-sc-hl22si-16').should('contain.text', Cypress.env('gitHubUsername'))
    })
  });
  