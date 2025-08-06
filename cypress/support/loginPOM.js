// // cypress/support/loginPOM.js

// class LoginPage {
//   selectors = {
//     usernameInput: () => cy.get('input[name="username"]'),
//     passwordInput: () => cy.get('input[name="password"]'),
//     submitButton: () => cy.get('button[type="submit"]'),
//     errorMessage: () => cy.get('.oxd-alert-content-text') // error area
//   };

//   visit() {
//     cy.visit("/"); // uses baseUrl
//   }

//   performLogin({ username, password }) {
//     this.visit();
//     cy.wait(2000);
//     this.selectors.usernameInput().clear().type(username);
//     this.selectors.passwordInput().clear().type(password);
//     this.selectors.submitButton().click();
//   }

//   loginWithSession(credentials) {
//     cy.session("saved-login", () => {
//       this.performLogin(credentials);
//        cy.get("a.oxd-main-menu-item", { timeout: 10000 }).should("be.visible");
//       cy.url().should("not.include", "/web/index.php/auth/login");
//     });
//   }

//   getError() {
//     return this.selectors.errorMessage();
//   }
// }

// export const loginPage = new LoginPage();
// cypress/support/loginPOM.js

class LoginPage {
  selectors = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.get('button[type="submit"]'),
    errorMessage: () => cy.get('.oxd-alert-content-text')
  };

  visit() {
    cy.visit("/"); // this loads the login page via baseUrl
  }

  performLogin({ username, password }) {
    this.visit();
    this.selectors.usernameInput().should("be.visible").clear().type(username);
    this.selectors.passwordInput().should("be.visible").clear().type(password);
    this.selectors.submitButton().click();
  }

  loginWithSession(credentials) {
    cy.session(
      "saved-login",
      () => {
        this.performLogin(credentials);
        // wait until the app UI is ready (menu loaded)
        cy.get("a.oxd-main-menu-item", { timeout: 15000 }).should("be.visible");
      },
      {
        validate: () => {
          // do NOT reload; just assert session is still active by checking the menu
          cy.get("a.oxd-main-menu-item", { timeout: 10000 }).should("be.visible");
        }
      }
    );
  }

  getError() {
    return this.selectors.errorMessage();
  }
}

export const loginPage = new LoginPage();
