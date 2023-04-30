import { combineReducers } from "redux";
import { constructorReducer } from "./BurgerConstructor";
import { ingredientsReducer } from "./Ingredients";
import { modalReducer } from "./Modal";
import { orderReducer } from "./Order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  modal: modalReducer,
});
