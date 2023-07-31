describe('Auth', () => {
  it('successfully authenticates user', () => {
    // cy.restoreLocalStorage();

    cy.visit(`https://github.com/login/oauth/authorize?scope=user:email&client_id=b0d124a1789132a87678`);

    cy.get('input#login_field').type(Cypress.env('gitHubUsername'));
    cy.get('input#password').type(Cypress.env('gitHubPassword'), {
      log: false
    });
    cy.get('[type="submit"]').click();

    // cy.get('[type="submit"]')
    //   .contains('Authorize reibase')
    //   .click();

    cy.visit(`https://github.com/jex441/demo/pulls`);

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
      // Set contributor id and name for future use and for inject.js to refer to
      window.localStorage.setItem('contributor_name', response.body.data.findOrCreateUser.contributor_name);
      window.localStorage.setItem('contributor_id', response.body.data.findOrCreateUser.contributor_id);
      Cypress.env('contributorID', response.body.data.findOrCreateUser.contributor_id);
      Cypress.env('contributorName', response.body.data.findOrCreateUser.contributor_name);
      // Set owner and repo for future use and for inject.js to refer to
      cy.get(':nth-child(1) > .AppHeader-context-item > .AppHeader-context-item-label').then(owner => window.localStorage.setItem('owner', owner[0].innerText))
      cy.get(':nth-child(2) > .AppHeader-context-item > .AppHeader-context-item-label').then(repo => window.localStorage.setItem('repo', repo[0].innerText))
    });

    cy.visit(`https://github.com/jex441/demo/pulls`);

    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: {
        operationName: 'createRepo',
        query: `
          query createRepo {
            createRepo(
              turboSrcID: "${Cypress.env('turboSrcID')}",
              owner: "${Cypress.env('gitHubUsername')}",
              repo: "demo",
              defaultHash: "",
              contributor_id: "${Cypress.env('contributorID')}",
              side: "",
              token: "${Cypress.env('gitHubToken')}"
            ) 
          }
          `
      }
    });
    cy.reload();
    //Not working
    // cy.saveLocalStorage();
  });
});
