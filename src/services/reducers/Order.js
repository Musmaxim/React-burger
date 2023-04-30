import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  CLOSE_MODAL_ORDER,
} from "../actions/Order";

const initialState = {
  numbOrder: null,
  request: false,
  failed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        numbOrder: action.numbOrder,
        request: false,
      };
    }
    case GET_ORDER_FAIL: {
      return {
        ...state,
        failed: true,
        request: false,
      };
    }
    case CLOSE_MODAL_ORDER: {
      return {
        ...state,
        numbOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
