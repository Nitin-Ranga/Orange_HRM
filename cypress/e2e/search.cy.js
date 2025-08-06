import { loginPage } from "../support/loginPOM";
import { addemp } from "../support/addemp";
import { verifyuser } from "../support/verify";
import creds from "../fixtures/creds.json";

describe("Verify & Search the added employee in the list", () => {
  beforeEach(() => {

    cy.viewport(1440,900);
     loginPage.performLogin(creds.valid);
     addemp.navigatetopim();

    // add employee fresh each time
    addemp.navigatetopim();
    addemp.addbuttonone();
    const employee = creds.validemployee;
    addemp.addfirstname(employee.firstname);
    addemp.addlastname(employee.lastname);
    addemp.addempphoto(employee.image);
    addemp.savethedata();

  });

  it("TC 1: should find the newly added employee by first name", () => {

    const employee = creds.validemployee;
    cy.intercept("GET", "/web/index.php/api/v2/dashboard/employees/action-summary").as("dashboardData");
    cy.get("a.oxd-main-menu-item", { timeout: 20000 }).should("be.visible");
    verifyuser.visit();
    addemp.navigatetopim();

    // search and verify
    verifyuser.searchtoemp(employee.firstname);
    cy.contains(employee.firstname, { timeout: 10000 }).first().click();
    addemp.searchemp();
    cy.wait(2000);
    cy.contains(employee.firstname).should("be.visible");
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains(employee.firstname).should("be.visible");

  });
});
