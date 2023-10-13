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

const findOrCreateUserRequestBody = (contributorName, contributorID = 'none', contributorSignature = 'none', token) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'findOrCreateUser',
      query: `
    query findOrCreateUser {
      findOrCreateUser(
        turboSrcID: "${Cypress.env('turbosrcID')}",
        owner: "${Cypress.env('gitHubUsername')}",
        repo: "${Cypress.env('gitHubRepo')}",
        contributor_id: "${contributorID}",
        contributor_name: "${contributorName}",
        contributor_signature: "${contributorSignature}",
        token: "${token}"
  ) 
  { contributor_name, contributor_id, contributor_signature, token }
    }
    `
    }
  };
};

const transferVotePowerRequestBody = (repoID, from, to, amount) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'transferTokens',
      query: `
    query transferTokens {
      transferTokens(
          turboSrcID: "${Cypress.env('turboSrcID')}",
          owner: "${Cypress.env('gitHubUsername')}",
          repo: "${repoID}",
          from: "${from}",
          to: "${to}",
          amount: ${amount},
          token: "${Cypress.env('gitHubToken')}"
      ) 
      { status }
    }
    `
    }
  };
};

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
    let demoRepoName = `${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}`;

    // Loop through testers and transfer VotePower to each one:
    for (let index in testers) {
      let tester = testers[index];
      let { key, user, apiToken } = tester;

      cy.getNameSpaceRepo(demoRepoName).then(res => {
        const reqBody = transferVotePowerRequestBody(res.repoID, Cypress.env('contributorID'), key, 50_000);
        cy.request(reqBody).then(response => {
          expect(response.body.data.transferTokens).to.have.property('status', 201);
        });
      });
    }
  });
});
