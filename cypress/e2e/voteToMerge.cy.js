let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

import { setVoteRequestBody, getVotesRequestBody } from './requests';

describe('Voting', () => {
  it('should vote on PR #1', () => {
    const demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    cy.login();

    cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);

    const { testers } = cypress;
    for (let index in testers) {
      let tester = testers[index];
      let { key, apiToken } = tester;
      cy.wait(1000);
      cy.getNameSpaceRepo(demoRepoName).then(res => {
        const testerVoteRequestBody = setVoteRequestBody(res.repoID, 'issue_1', 'issue_1', true, key, 'yes', apiToken);

        cy.request(testerVoteRequestBody).then(response => {
          expect(response.body.data.setVote).to.equal('201');
        });
      });
    }
  });
});

describe('Check PR state', () => {
  it('should still have a state of "open"', () => {
    const demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    cy.getNameSpaceRepo(demoRepoName).then(res => {
      const reqBody = getVotesRequestBody(res.repoID, 'issue_1', Cypress.env('contributorID'));

      cy.request(reqBody).then(response => {
        expect(response.body.data.getVotes.state).to.equal('open');
      });
    });
  });
});

describe('Majority vote', () => {
  it('should exceed the quorum and vote to merge', () => {
    const demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    cy.login();

    cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);

    cy.getNameSpaceRepo(demoRepoName).then(res => {
      const testerVoteRequestBody = setVoteRequestBody(res.repoID, 'issue_1', 'issue_1', true, Cypress.env('contributorID'), 'yes', Cypress.env('gitHubToken'));

      cy.request(testerVoteRequestBody).then(response => {
        expect(response.body.data.setVote).to.equal('201');
      });
    });
  });
});

describe('Check PR state again', () => {
  it('should have a state of "merge"', () => {
    const demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    cy.getNameSpaceRepo(demoRepoName).then(res => {
      const reqBody = getVotesRequestBody(res.repoID, 'issue_1', Cypress.env('contributorID'));

      cy.request(reqBody).then(response => {
        expect(response.body.data.getVotes.state).to.equal('merge');
      });
    });
  });
});