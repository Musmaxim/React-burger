import { dataApi } from "../../utils/data";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  (async () => {
    try {
      const res = await fetch(dataApi + 'ingredients');
      if (res.ok) {
        const { data } = await res.json();
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data,
        });
      } else {
        throw new Error(`Ошибка ${res.status}`);
      }
    } catch (err) {
      dispatch({
        type: GET_INGREDIENTS_FAIL,
      });
    }
  })();
};
