import {checkResponse} from "../../utils/checkResponce";
import { dataApi } from "../../utils/data";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  fetch(dataApi + "ingredients")
    .then((res) => checkResponse(res))
    .then((dataJson) =>
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: dataJson.data,
      })
    )
    .catch((e) => {
      dispatch({
        type: GET_INGREDIENTS_FAIL,
      });
    });
};
