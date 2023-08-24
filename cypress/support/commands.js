// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

// In cypress/support/commands.js

Cypress.Commands.add('login', () => {
  cy.visit(`https://github.com/login/oauth/authorize?scope=user:email&client_id=b0d124a1789132a87678`);

  cy.get('input#login_field').type(Cypress.env('gitHubUsername'));
  cy.get('input#password').type(Cypress.env('gitHubPassword'), {
    log: false
  });
  cy.get('[type="submit"]').click();

  // If GitHub prompts to accept terms:
  // cy.get('[type="submit"]')
  //   .contains('Authorize reibase')
  //   .click();

  cy.getCookie('logged_in').should('have.property', 'value', 'yes');

  cy.get('p').should($p => {
    expect($p).to.contain('Success! You may close this window.');
  });
});

Cypress.Commands.add('findOrCreateUser', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'findOrCreateUser',
      query: `
      query findOrCreateUser {
        findOrCreateUser(
          turboSrcID: "${Cypress.env('turboSrcID')}",
          owner: "${Cypress.env('gitHubUsername')}",
          repo: "${Cypress.env('repo')}",
          contributor_id: "${Cypress.env('contributorID')}",
          contributor_name: "${Cypress.env('gitHubUsername')}",
          contributor_signature: "${Cypress.env('contributorSignature')}",
          token: "${Cypress.env('gitHubToken')}"
    ) 
    { contributor_name, contributor_id, contributor_signature }
      }
      `
    }
  }).then(response => {
    expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', Cypress.env('gitHubUsername'));
    expect(response.body.data.findOrCreateUser).to.have.property('contributor_id', Cypress.env('contributorID'));
    expect(response.body.data.findOrCreateUser).to.have.property('contributor_signature', Cypress.env('contributorSignature'));
  });
});

Cypress.Commands.add('createRepo', () => {
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
    expect(Number(response.body.data.createRepo)).to.be.greaterThan(200);
  });
});

Cypress.Commands.add('getRepoData', () => {
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
            contributor_id,
            head,
            quorum,
            contributor {
              contributor_id,
              contributor,
              votePower,
            },
          pullRequests {
            state,
            repo_id,
            issue_id,
            title,
            forkBranch,
            baseBranch,
            defaultHash,
            childDefaultHash,
            head,
            defaultHash,
            remoteURL
          voteData {
            contributor {
            contributor_id,
            voted,
            side,
            votePower,
            createdAt,
            },
          voteTotals {
            yesPercent,
            noPercent,
            totalVotes,
            totalYesVotes,
            totalNoVotes,
          },
          votes {
            contributor_id,
            side,
            votePower,
            createdAt
          }
        }
      }
    }
  }`
    }
  }).then(response => {
    expect(response.body.data.getRepoData).to.have.property('contributor_id', Cypress.env('contributorID'));
  });
});
