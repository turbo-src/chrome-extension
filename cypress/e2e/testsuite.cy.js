describe('DOM', () => {

/*    describe('Login Process', () => {
      it('should login to GitHub', () => {
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
    
        cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);
      });
    }); */
  
    describe('User Creation', () => {
      it('should create user', () => {
        cy.login();

        cy.request({
          method: 'POST',
          url: 'http://localhost:4000/graphql',
          body: {
            operationName: 'findOrCreateUser',
            query: `
            query findOrCreateUser {
              findOrCreateUser(
                turboSrcID: "${Cypress.env('turboSrcID')}",
                owner: "",
                repo: "",
                contributor_id: "none",
                contributor_name: "${Cypress.env('gitHubUsername')}",
                contributor_signature: "none",
                token: "${Cypress.env('gitHubToken')}"
          ) 
          { contributor_name, contributor_id }
            }
            `
          }
        }).then(response => {
            cy.log('response', response.body.data.findOrCreateUser.contributor_id);
            expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', Cypress.env('gitHubUsername'));
            // Set contributor id and name for inject.js to refer to
            window.localStorage.setItem('contributor_name', response.body.data.findOrCreateUser.contributor_name);
            window.localStorage.setItem('contributor_id', response.body.data.findOrCreateUser.contributor_id);
            // Set contributor id for the next tests
            Cypress.env('contributorID', response.body.data.findOrCreateUser.contributor_id);
            // Set owner and repo for future use and for inject.js to refer to
            cy.get(':nth-child(1) > .AppHeader-context-item > .AppHeader-context-item-label').then(owner =>
              window.localStorage.setItem('owner', owner[0].innerText)
            );
            cy.get(':nth-child(2) > .AppHeader-context-item > .AppHeader-context-item-label').then(repo =>
              window.localStorage.setItem('repo', repo[0].innerText)
            );
        });
      });
    });
  
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

    describe('Get Repo Data', () => {
  
      it('should get repo data', () => {
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
                contributor_id
                }
              }
              `
          }
        }).then(response => {
            expect(response.body.data.getRepoData).to.have.property('contributor_id', Cypress.env('contributorID'));
        });
      });
    });
  
    describe('Votestatus Buttons', () => {
      it('should check votestatus buttons', () => {
        cy.get('#turbo-src-btn-issue_6').should('be.visible');
        cy.get('#turbo-src-btn-issue_5').should('be.visible');
        cy.get('#turbo-src-btn-issue_4').should('be.visible');
        cy.get('#turbo-src-btn-issue_3').should('be.visible');
        cy.get('#turbo-src-btn-issue_2').should('be.visible');
        cy.get('#turbo-src-btn-issue_1').should('be.visible');      });
    });
  });
  