describe('Login Process', () => {
    it('should login to GitHub', () => {
      cy.visit(`https://github.com/login/oauth/authorize?scope=user:email&client_id=b0d124a1789132a87678`);

      cy.get('input#login_field').type(Cypress.env('gitHubUsername'));
      cy.get('input#password').type(Cypress.env('gitHubPassword'), {
        log: false
      });
      cy.get('[type="submit"]').click();
  
      // If GitHub prompts to accept terms:
      // cy.get('[type="submit"]')
      //   .contains('Authorize reibase')
      //   .click();
  
      cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);
    });
  });