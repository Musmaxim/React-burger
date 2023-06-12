import { TIngredient } from "../../utils/types";

export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const CLEAR_SELECTED_INGREDIENT = "CLEAR_SELECTED_INGREDIENT";

export type TSelectIngredient = {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: TIngredient;
};

export type TClearSelectedIngredient = {
  readonly type: typeof CLEAR_SELECTED_INGREDIENT;
  readonly ingredient: TIngredient;
};

export type TSelectIngredientActions =
  | TSelectIngredient
  | TClearSelectedIngredient;
