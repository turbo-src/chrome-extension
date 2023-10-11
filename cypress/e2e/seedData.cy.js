let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

describe('Seed data', () => {
  it('should create a repo, users, and transfer 50_000 VotePower to each one.', () => {
    // See cypress/support/commands.js
    // If you have not created the repo, run this test before dom.cy.js
    cy.findOrCreateUser(
      Cypress.env('turbosrcID'),
      Cypress.env('gitHubUsername'),
      Cypress.env('gitHubRepo'),
      Cypress.env('contributorID'),
      Cypress.env('gitHubUsername'),
      Cypress.env('contributorSignature'),
      Cypress.env('gitHubToken')
    );

    // Create demo repo
    cy.createRepo();

    // Create bots
    const { testers } = cypress;
    let repoID;
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: {
        operationName: 'getNameSpaceRepo',
        query: `
          query getNameSpaceRepo {
            getNameSpaceRepo(
                repoNameOrID: "${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}",
            ) 
            { status, repoID }
          }
          `
      }
    }).then(response => {
      // Your assertions and further actions here
      expect(response.body.data.getNameSpaceRepo).to.have.property('status', 200);
      repoID = response.body.data.getNameSpaceRepo.repoID;
      return cy.wrap(response.body.data.getNameSpaceRepo);
    });

    for (let objectKey in testers) {
      let bot = testers[objectKey];
      let { key, user, apiToken } = bot;

      let testUser = cy.findOrCreateUser(
        Cypress.env('turbosrcID'),
        Cypress.env('gitHubUsername'),
        Cypress.env('gitHubRepo'),
        key,
        user,
        key + key,
        apiToken
      );

      cy.getNameSpaceRepo(`${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`).then(res =>
        cy
          .request({
            method: 'POST',
            url: 'http://localhost:4000/graphql',
            body: {
              operationName: 'transferTokens',
              query: `
              query transferTokens {
                transferTokens(
                    turboSrcID: "${Cypress.env('turboSrcID')}",
                    owner: "${Cypress.env('gitHubUsername')}",
                    repo: "${res.repoID}",
                    from: "${Cypress.env('contributorID')}",
                    to: "${key}",
                    amount: ${5000},
                    token: "${Cypress.env('gitHubToken')}"
                ) 
                { status }
              }
              `
            }
          })
          .then(response => {
            // Your assertions and further actions here
            expect(response.body.data.transferTokens).to.have.property('status', 201);
          })
      );
    }
  });
});
