let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

describe('Create users, transfer them VotePower', () => {
  it('should create users, and transfer 50_000 VotePower to each one.', () => {
    const { testers } = cypress;

    for (let objectKey in testers) {
      let bot = testers[objectKey];
      let { key, user, apiToken } = bot;

      cy.findOrCreateUser(
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
