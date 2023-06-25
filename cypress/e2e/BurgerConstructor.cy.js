import { BURGER_API } from "../../src/utils/data";

describe("тестирование BurgerConstructor", () => {
  beforeEach(() => {
    cy.viewport(1400, 800);
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", `${BURGER_API}ingredients`, {
      fixture: "ingredients.json",
    });
    cy.intercept("POST", `${BURGER_API}auth/login`, { fixture: "login.json" }).as(
      "postLogin"
    );
    cy.intercept("POST", `${BURGER_API}orders`, { fixture: "order.json" });
  });

  it("тестирование модалок", () => {
    cy.wait(1000);
    cy.get("[data-testid=dragElement]").eq(0).click();
    cy.get("[data-testid=modal]").should("be.visible");
    cy.url().should("include", "/ingredients/60d3b41abdacab0026a733c6");
    cy.get("[data-testid=modalTitle]").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("[data-testid=ingredientImage]").should("be.visible");
    cy.get("[data-testid=ingredientName]").should("not.be.empty");
    cy.get("[data-testid=ingredientInfo]").should("not.be.empty");
    cy.get("[data-testid=btnCloseModal]").click();
    cy.get("[data-testid=modal]").should("not.exist");
  });

  it("тестирование логина, dnd, оформление заказа", () => {

    cy.visit("http://localhost:3000/react-burger#/login");
    cy.wait(1000);
    cy.get("[data-testid=testInputEmail]").type("test@test.ru");
    cy.get("[data-testid=testInputPassword]").type("test");
    cy.get("[data-testid=testBtnLogin]").click();

    cy.get("[data-testid=dragElement]").should("exist");
    cy.get("[data-testid=dragElement]").eq(0).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").should("exist");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(3).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(6).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(10).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get(`[data-testid=btnMakeOrder]`)
      .should("exist")
      .and("contain", "Оформить заказ")
      .click();
    cy.get("[data-testid=modal]").should("be.visible");
    cy.get("[data-testid=orderNumber]").should("not.be.empty");
    cy.get("[data-testid=btnCloseModal]").click();
    cy.get("[data-testid=modal]").should("not.exist");
  });
});
