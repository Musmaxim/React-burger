import { dataApi } from "../../utils/data";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER";

export const createOrder = (data) => (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  (async () => {
    try {
      if (data.length > 0) {
        const res = await fetch(dataApi + "orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            ingredients: data.map((ingredient) => ingredient._id),
          }),
        });
        if (res.ok) {
          const { order } = await res.json();
          dispatch({
            type: GET_ORDER_SUCCESS,
            numbOrder: order.number,
          });
        } else {
          throw new Error(`Ошибка ${res.status}`);
        }
      }
    } catch (err) {
      dispatch({
        type: GET_ORDER_FAIL,
      });
    }
  })();
};
