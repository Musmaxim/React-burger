import { Dispatch } from "redux";
import { getFetch } from "../../utils/getFetch";
import { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};
type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
};
type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};
export type TGetIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsFailed;

export const getIngredients = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  (async () => {
    try {
      const res = await getFetch("ingredients");
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data,
      });
    } catch {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    }
  })();
};
