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

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
  });

  Cypress.Commands.add("restoreLocalStorage", () => {
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
  cy.visit(`https://github.com/${Cypress.env('gitHubUsername')}/${Cypress.env('gitHubRepo')}/pulls`);
})

// In your spec file

it('does something on a secured page', function () {
  //const { username, password } = this.currentUser
  cy.login()

  // ...rest of test
})