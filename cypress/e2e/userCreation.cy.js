describe('User Creation', () => {
    it('should create user', () => {

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
          // Set contributor id and name for inject.js to refer to
          window.localStorage.setItem('contributor_name', response.body.data.findOrCreateUser.contributor_name);
          window.localStorage.setItem('contributor_id', response.body.data.findOrCreateUser.contributor_id);
          // Set contributor id for the next tests
          Cypress.env('contributorID', response.body.data.findOrCreateUser.contributor_id);
      });
    });
  });