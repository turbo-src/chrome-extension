describe('Auth', () => {
  it('successfully authenticates user', () => {
    cy.restoreLocalStorage();

    cy.visit(`https://github.com/login/oauth/authorize?scope=user:email&client_id=b0d124a1789132a87678`);

    cy.get('input#login_field').type(Cypress.env('gitHubUsername'));
    cy.get('input#password').type(Cypress.env('gitHubPassword'), {
      log: false
    });
    cy.get('[type="submit"]').click();

    // cy.get('[type="submit"]')
    //   .contains('Authorize reibase')
    //   .click();

    cy.visit(`https://github.com/ramirc5/demo/pulls`);

    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: {
        operationName: 'findOrCreateUser',
        query: `
        query findOrCreateUser {
          findOrCreateUser(
            turboSrcID: "${Cypress.env('turboSrcID')}",
            owner: "",
            repo: "",
            contributor_id: "none",
            contributor_name: "${Cypress.env('gitHubUsername')}",
            contributor_signature: "none",
            token: "${Cypress.env('gitHubToken')}"
          ) 
          { contributor_name, contributor_id }
        }
        `
      }
    }).then(response => {
      expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', Cypress.env('gitHubUsername'));
      //Not working:
      window.localStorage.setItem('contributor_name', response.body.data.findOrCreateUser.contributor_name);
      window.localStorage.setItem('contributor_id', response.body.data.findOrCreateUser.contributor_id);
    });

    //Not working
    cy.saveLocalStorage();
  });
});
