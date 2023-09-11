describe('Extension', () => {
  // NB - run npm start from the root dir of chrome-extension in another terminal window.
  // This will run the extension in the browser on localhost:5001/popup.html so we can test it there
    it('should visit the home page', () => {
      cy.visit(`http://localhost:5001/popup.html`);
      cy.get(':nth-child(1) > .Home__GithubLink-sc-hl22si-16').should('contain.text', Cypress.env('gitHubUsername'))
      cy.get('.Home__BoldText-sc-hl22si-6 > .Home__GithubLink-sc-hl22si-16').should('contain.text', Cypress.env('gitHubRepo'))
      cy.wait(3000)
      cy.get('.nav > :nth-child(3)').click()
      cy.wait(3000)
      cy.get('.nav > :nth-child(4)').click()
    })
  });
  