describe('Auth', () => {
  it('successfully authenticates user', () => {
    cy.restoreLocalStorage();

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
              owner: "jex441",
              repo: "demo",
              defaultHash: "123",
              contributor_id: "0xe739bcfabfe4c794043378d9a2cf3e050d1bc62a",
              side: "",
              token: "${Cypress.env('gitHubToken')}"
            ) 
          }
          `
      }
    });
    cy.reload();
    //Not working
    cy.saveLocalStorage();
  });
});
