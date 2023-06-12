import { combineReducers } from "redux";
import { constructorReducer } from "./BurgerConstructor";
import { forgotPasswordReducer } from "./ForgotPassword";
import { ingredientsReducer } from "./Ingredients";
import { selectedIngredientReducer } from "./SelectedIngredients";
import { resetPasswordReducer } from "./ResetPassword";
import { userReducer } from "../slices/User";
import { wsFeedReducer } from "./WsFeed";
import { selectedOrderReducer } from "../slices/SelectedOrder";
import { wsProfileReducer } from "./WsProfile";
import { orderReducer } from "../slices/Order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  selectedIngredient: selectedIngredientReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  user: userReducer,
  wsFeed: wsFeedReducer,
  wsProfile: wsProfileReducer,
  selectedOrder: selectedOrderReducer,
});
