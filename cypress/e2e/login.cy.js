import { loginPage } from "../support/loginPOM";
import creds from "../fixtures/creds.json";

describe("Login - two test cases", () => {

  it("TC1: Login with valid credentials", () => {
    loginPage.loginWithSession(creds.valid);
    cy.visit("/"); // restore session
    cy.wait(2000);
    cy.url().should("include", "/web/index.php/dashboard/index");
    cy.get("header").should("be.visible");
  });

  it("TC2: Login with invalid credentials & validate error", () => {
  
    cy.wait(2000);
    loginPage.performLogin(creds.invalid);
    loginPage.getError().should("be.visible");
    cy.contains("Invalid credentials").should("exist");
    cy.wait(2000);
  
  });

  it("TC 3-> Tries with empty credentials or invalid creds", ()=>{
  
    cy.visit("/");
    cy.get('button[type="submit"]').click();
    cy.contains("Required");
  
  })
});
