import { Dispatch } from "redux";
import { TIngredient } from "../../utils/types";
import { getFetch } from "../../utils/getFetch";
import { setOrder, setOrderNum, setStatus } from "../slices/Order";

export const CLEAR_INGREDIENTS: "CLEAR_INGREDIENTS" = "CLEAR_INGREDIENTS";

export const createOrder =
  (data: Array<TIngredient | null>) => (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    (async () => {
      try {
        if (data.length > 0) {
          const res = await getFetch("orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
              ingredients: data.map((nextIngredient) => nextIngredient?._id),
            }),
          });
          dispatch(setOrderNum(res.order.number));
          dispatch({
            type: CLEAR_INGREDIENTS,
          });
        }
      } catch {
        dispatch(setStatus("failed"));
      }
    })();
  };

export const getOrder = (orderNum: string) => (dispatch: Dispatch) => {
  (async () => {
    try {
      if (orderNum) {
        const res = await getFetch(`orders/${orderNum}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        dispatch(setOrder(res.orders[0]));
      }
    } catch {}
  })();
};
