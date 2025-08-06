// cypress/support/verify.js

class VerifyUser {
  selector = {
    searchempname: () => cy.get('input[placeholder="Type for hints..."]').eq(0)
  };

  visit() {
    cy.visit("/");
  }

  searchtoemp(firstname) {
    this.selector.searchempname().should("be.visible").clear().type(firstname);
  }
}

export const verifyuser = new VerifyUser();
