import { dataApi } from "../../utils/data";
import checkResponse from "../../utils/checkResponce";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER";

export const createOrder = (data) => (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  fetch(dataApi + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: data.map((ingredient) => ingredient._id),
    }),
  })
    .then((res) => checkResponse(res))
    .then((dataJson) =>
      dispatch({
        type: GET_ORDER_SUCCESS,
        numbOrder: dataJson.order.number,
      })
    )
    .catch((e) => {
      dispatch({
        type: GET_ORDER_FAIL,
      });
    });
};
