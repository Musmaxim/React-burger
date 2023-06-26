import { BURGER_API } from "../../src/utils/data";

describe("тестирование BurgerConstructor", () => {
  beforeEach(() => {
    cy.viewport(1400, 800);
    cy.visit("/");
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
    cy.get(testIds.dragElement).eq(0).click();
    cy.get(testIds.modal).should("be.visible");
    cy.url().should("include", "/ingredients/60d3b41abdacab0026a733c6");
    cy.get(testIds.modalTitle).should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get(testIds.ingredientImage).should("be.visible");
    cy.get(testIds.ingredientName).should("not.be.empty");
    cy.get(testIds.ingredientInfo).should("not.be.empty");
    cy.get(testIds.btnCloseModal).click();
    cy.get(testIds.modal).should("not.exist");
  });

  it("тестирование логина, dnd, оформление заказа", () => {

    cy.visit("login");
    cy.wait(1000);
    cy.get(testIds.testInputEmail).type("test@test.ru");
    cy.get(testIds.testInputPassword).type("test");
    cy.get(testIds.testBtnLogin).click();

    cy.get(testIds.dragElement).should("exist");
    cy.get(testIds.dragElement).eq(0).trigger("dragstart");
    cy.get(testIds.constructorContainer).should("exist");
    cy.get(testIds.constructorContainer).trigger("drop");

    cy.get(testIds.dragElement).eq(3).trigger("dragstart");
    cy.get(testIds.constructorContainer).trigger("drop");

    cy.get(testIds.dragElement).eq(6).trigger("dragstart");
    cy.get(testIds.constructorContainer).trigger("drop");

    cy.get(testIds.dragElement).eq(10).trigger("dragstart");
    cy.get(testIds.constructorContainer).trigger("drop");

    cy.get(`[data-testid=btnMakeOrder]`)
      .should("exist")
      .and("contain", "Оформить заказ")
      .click();
    cy.get(testIds.modal).should("be.visible");
    cy.get(testIds.orderNumber).should("not.be.empty");
    cy.get(testIds.btnCloseModal).click();
    cy.get(testIds.modal).should("not.exist");
  });
});

const testIds = {
  dragElement: "[data-testid=dragElement]",
  modal: "[data-testid=modal]",
  modalTitle: "[data-testid=modalTitle]",
  ingredientImage: "[data-testid=ingredientImage]",
  ingredientName: "[data-testid=ingredientName]",
  ingredientInfo: "[data-testid=ingredientInfo]",
  btnCloseModal: "[data-testid=btnCloseModal]",
  testInputEmail: "[data-testid=testInputEmail]",
  testInputPassword: "[data-testid=testInputPassword]",
  testBtnLogin: "[data-testid=testBtnLogin]",
  constructorContainer: "[data-testid=constructorContainer]",
  orderNumber: "[data-testid=orderNumber]",
};