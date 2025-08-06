import "cypress-file-upload";

class emp {
  selectors = {
    pimbutton: () => cy.contains("a.oxd-main-menu-item", "PIM"),
    addbutton: () => cy.contains("button", "Add"),
    efname: () => cy.get('input[name="firstName"]'),
    lmname: () => cy.get('input[name="lastName"]'),
    photo: () => cy.get('button[role="none"]'),
    fileInput: () => cy.get('input[type="file"]'),
    savebutton: () =>
      cy.get("button[type='submit']"),
    hintsearch: () => cy.get('input[placeholder="Type for hints..."]'),
    searchbtn: () =>
      cy.get(".oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space")
  };

  visit() {
    cy.visit("/");
  }

  navigatetopim() {
    this.selectors.pimbutton().first().should("be.visible").click();
  }

  addbuttonone() {
    this.selectors.addbutton().first().should("be.visible").click();
  }

  addfirstname(firstname) {
    this.selectors.efname().should("be.visible").clear().type(firstname);
  }

  addlastname(lastName) {
    this.selectors.lmname().should("be.visible").clear().type(lastName);
  }

  addempphoto(imagePath) {
    this.selectors.photo().first().click();
    this.selectors.fileInput().attachFile(imagePath);
  }

  savethedata() {
    this.selectors.savebutton().should("be.enabled").click({ multiple: true });
  }

  searchandselectemp(name) {
    this.selectors.hintsearch().clear().type(name);
    cy.contains(name).click();
  }

  searchemp() {
    this.selectors.searchbtn().click();
  }
}

// export with the name you're importing
export const addemp = new emp();
