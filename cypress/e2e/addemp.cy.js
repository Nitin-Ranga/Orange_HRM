import { loginPage } from "../support/loginPOM";
import { addemp } from "../support/addemp";
import creds from "../fixtures/creds.json";

describe("login & PIM navigation", () => {
  beforeEach(() =>{
     cy.viewport(1440,900);
     loginPage.performLogin(creds.valid);
     addemp.navigatetopim();
  })
 
  it("TC 1->User Should be able login,wait for dashboard load, then go to PIM", () => { 
    
    cy.intercept("GET", "/web/index.php/api/v2/dashboard/employees/action-summary").as("dashboardData");
    cy.get("a.oxd-main-menu-item", { timeout: 20000 }).should("be.visible");
    addemp.navigatetopim();
    cy.url().should("include", "/index.php/pim/viewEmployeeList");

  });

  it('TC 2-> User able to add new employee', ()=>{
    
    const employee = creds.validemployee;
    cy.intercept("GET", "/web/index.php/api/v2/pim/employees").as("PIMData");  
    addemp.addbuttonone();
    addemp.addfirstname(employee.firstname);
    addemp.addlastname(employee.lastname);
    cy.wait(2000);
    addemp.savethedata();
    cy.wait(2000);
    cy.get('input[name="firstName"]').should("have.value", employee.firstname);
    cy.get('input[name="lastName"]').should("have.value", employee.lastname);

  })
});
