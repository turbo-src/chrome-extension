let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

const createRepoRequestBody = (repoName, contributorID, token) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'createRepo',
      query: `
        query createRepo {
          createRepo(
              turboSrcID: "${Cypress.env('turboSrcID')}",
              owner: "",
              repo: "${repoName}",
              defaultHash: "",
              contributor_id: "${contributorID}",
              side: "",
              token: "${token}"
          ) 
        }
        `
    }
  };
};

describe('Create repo', () => {
  it('should create a user and a repo', () => {
    // See cypress/support/commands.js

    // Create maintainer user:
    cy.findOrCreateUser(
      Cypress.env('turbosrcID'),
      Cypress.env('gitHubUsername'),
      Cypress.env('gitHubRepo'),
      Cypress.env('contributorID'),
      Cypress.env('gitHubUsername'),
      Cypress.env('contributorSignature'),
      Cypress.env('gitHubToken')
    );

    const repoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;
    const createDemoRepoRequestBody = createRepoRequestBody(repoName, Cypress.env('contributorID'), Cypress.env('gitHubToken'))
    // Create demo repo
    cy.request(createDemoRepoRequestBody).then(response => {
      expect(Number(response.body.data.createRepo)).to.equal(201);
    });
  });
});
