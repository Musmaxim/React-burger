import { TSelectIngredientState } from "../../utils/types";
import {
  SELECT_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
  TSelectIngredientActions,
} from "../actions/SelectedIngredients";

const initialState: TSelectIngredientState = {
  ingredient: null,
};

export const selectedIngredientReducer = (
  state = initialState,
  action: TSelectIngredientActions
) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return { ingredient: action.ingredient };
    }
    case CLEAR_SELECTED_INGREDIENT: {
      return { ingredient: null };
    }
    default: {
      return state;
    }
  }
};
