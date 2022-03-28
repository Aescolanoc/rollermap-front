// https://docs.cypress.io/api/introduction/api.html

describe("RollerMap", () => {
  it("the user can login", () => {
    cy.visit("/");
    cy.get('input[type="text"').type("pepe@pepe.es");
    cy.get('input[type="password"').type("12345");
    cy.get("button.bg-deep-purple").click();
    cy.location("pathname").should("contain", "rollerplaces/all");
  });

  it("the user click on 'see details'", () => {
    cy.contains("Ver más").click();
    cy.location("pathname").should("contain", "rollerplaces");
  });

  it("the user click on 'Sites'", () => {
    cy.contains("Sitios").click();
    cy.location("pathname").should("contain", "rollerplaces");
  });

  it("the user click on 'My Sites'", () => {
    cy.contains("Mis sitios").click();
    cy.location("pathname").should("contain", "myrollerplaces");
  });
});
