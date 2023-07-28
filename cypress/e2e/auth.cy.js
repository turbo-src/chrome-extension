let password;
let contributorID;
describe('Auth', () => {
  it('successfully authenticates user', () => {
    cy.restoreLocalStorage();

    cy.visit(`https://github.com/login/oauth/authorize?scope=user:email&client_id=b0d124a1789132a87678`);

    cy.get('input#login_field').type('jex441');
    cy.get('input#password').type(password, {
      log: false
    });
    cy.get('[type="submit"]').click();

    // cy.get('[type="submit"]')
    //   .contains('Authorize reibase')
    //   .click();

    cy.visit(`https://github.com/jex441/demo/pulls`);

    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: {
        operationName: 'findOrCreateUser',
        query: `
        query findOrCreateUser {
          findOrCreateUser(
            turboSrcID: "0x9e81be64b30a850e038cb5a85241f58528010016",
            owner: "",
            repo: "",
            contributor_id: "none",
            contributor_name: "jex441",
            contributor_signature: "none",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJUb2tlbiI6ImdocF81dUZBNU1YN0pYc2JFOGRqRWs3cUxlZHFuRDZxM1MwZDV3eGoiLCJpYXQiOjE2OTAyODk2MzN9.ncE1AN7y4cvlBk2Y9_h7oXe57SS0JLAwDH3I43eiDt8"
          ) 
          { contributor_name, contributor_id }
        }
        `
      }
    }).then(response => {
      expect(response.body.data.findOrCreateUser).to.have.property('contributor_name', 'jex441');
      //Not working:
      contributorID = response.body.data.findOrCreateUser.contributor_id;
    });

    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: {
        operationName: 'createRepo',
        query: `
        query createRepo {
          createRepo(
            turboSrcID: "0x9e81be64b30a850e038cb5a85241f58528010016",
            owner: "jex441",
            repo: "demo",
            defaultHash: "123",
            contributor_id: "0xe739bcfabfe4c794043378d9a2cf3e050d1bc62a",
            side: "",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJUb2tlbiI6ImdocF81dUZBNU1YN0pYc2JFOGRqRWs3cUxlZHFuRDZxM1MwZDV3eGoiLCJpYXQiOjE2OTAyODk2MzN9.ncE1AN7y4cvlBk2Y9_h7oXe57SS0JLAwDH3I43eiDt8"
          ) 
        }
        `
      }
    });
    cy.reload();
    //Not working
    cy.saveLocalStorage();
  });
});
