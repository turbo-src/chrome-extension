let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}
import { createRepoRequestBody, findOrCreateUserRequestBody, transferVotePowerRequestBody } from './requests';

describe('Create users', () => {
  it('create a maintainer user and test users', () => {
    const createMaintainerReqBody = findOrCreateUserRequestBody(
      Cypress.env('gitHubUsername'),
      Cypress.env('contributorID'),
      Cypress.env('contributorSignature'),
      Cypress.env('gitHubToken')
    );
    // Create maintainer user:
    cy.request(createMaintainerReqBody).then(response => {
      expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', Cypress.env('gitHubUsername'));
    });

    // Loop through testers in cypress.env.json and create users:
    const { testers } = cypress;

    for (let index in testers) {
      let tester = testers[index];
      let { key, user, apiToken } = tester;

      const reqBody = findOrCreateUserRequestBody(user, key, key + key, apiToken);

      cy.request(reqBody).then(response => {
        expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', user);
      });
    }
  });
});

describe('Create repo', () => {
  it('create a demo repo', () => {
    const repoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    const reqBody = createRepoRequestBody(repoName, Cypress.env('contributorID'), Cypress.env('gitHubToken'));

    // Create demo repo
    cy.request(reqBody).then(response => {
      expect(Number(response.body.data.createRepo)).to.equal(201);
    });
  });
});

describe('Transfer VotePower', () => {
  it('Transfer 50_000 demo repo VotePower to each test user', () => {
    const { testers } = cypress;
    const demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    // Loop through testers and transfer VotePower to each one:
    for (let index in testers) {
      let tester = testers[index];
      let { key, user, apiToken } = tester;

      cy.getNameSpaceRepo(demoRepoName).then(res => {
        const reqBody = transferVotePowerRequestBody(res.repoID, Cypress.env('contributorID'), key, 50_000);
        cy.request(reqBody).then(response => {
          console.log('response from transfer', response)
          expect(response.body.data.transferTokens).to.have.property('status', 201);
        });
      });
    }
  });
});
