let cypress = {};
try {
  cypress = require('../../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

const setVoteRequestBody = (turboSrcID, owner, repo, defaultHash, childDefaultHash, mergeable, contributor_id, side, token) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'setVote',
      query: `
          query setVote {
            setVote(
                turboSrcID: "${turboSrcID}",
                owner: "${owner}",
                repo: "${repo}",
                defaultHash: "${defaultHash}",
                childDefaultHash: "${childDefaultHash}",
                mergeable: ${mergeable},
                contributor_id: "${contributor_id}",
                side: "${side}",
                token: "${token}"
            )
          }
          `
    }
  };
};

describe('Voting', () => {
  it('should vote on PR #1', () => {
    cy.login();

    cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);

    const { testers } = cypress;
    for (let objectKey in testers) {
      let bot = testers[objectKey];
      let { key, apiToken } = bot;

      const testerVoteRequestBody = setVoteRequestBody(
        Cypress.env('turboSrcID'),
        Cypress.env('gitHubUsername'),
        res.repoID,
        'issue_1',
        'issue_1',
        true,
        key,
        'yes',
        apiToken
      );

      cy.getNameSpaceRepo(`${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`).then(res =>
        cy.request(testerVoteRequestBody).then(response => {
          expect(response.body.data.setVote).to.equal('201');
        })
      );
    }
  });
});
