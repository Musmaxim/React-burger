import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
} from "../actions/Ingredients";

const initialState = {
  ingredients: null,
  request: false,
  failed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        request: false,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      return {
        ...state,
        failed: true,
        request: false,
      };
    }
    default: {
      return state;
    }
  }
};
