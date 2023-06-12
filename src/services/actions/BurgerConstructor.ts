import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENTS";

type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
};
type TRemoveIngredient = {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient;
};
type TSortIngredient = {
  readonly type: typeof SORT_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
};
type TClearIngredient = {
  readonly type: typeof CLEAR_INGREDIENT;
};

export type TBurgerConstructorActions =
  | TAddIngredient
  | TRemoveIngredient
  | TSortIngredient
  | TClearIngredient;

export const addIngredient = (item: TIngredient) => ({
  type: ADD_INGREDIENT,
  ingredient: { ...item, id: uuidv4() },
});
