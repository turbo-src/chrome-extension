describe('Get Repo Data', () => {
  
    it('should get repo data', () => {
      cy.login();
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/graphql',
        body: {
          operationName: 'getRepoData',
          query: `
            query getRepoData {
              getRepoData(
                  turboSrcID: "${Cypress.env('turboSrcID')}",
                  repo_id: "${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}",
                  contributor_id: "${Cypress.env('contributorID')}"
              ) {
              status, 
              repo_id,
              owner,
              contributor_id
              }
            }
            `
        }
      }).then(response => {
          expect(response.body.data.getRepoData).to.have.property('contributor_id', Cypress.env('contributorID'));
      });
    });
  });