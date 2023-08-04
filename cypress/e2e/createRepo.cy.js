describe('Create Repo', () => {
    it('should create a repo', () => {
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
                  repo: "${Cypress.env('gitHubRepo')}",
                  defaultHash: "",
                  contributor_id: "${Cypress.env('contributorID')}",
                  side: "",
                  token: "${Cypress.env('gitHubToken')}"
              ) 
            }
            `
        }
      }).then(response => {
        // Your assertions and further actions here
        expect(response.body.data.createRepo, '201');
      });
    });
  });