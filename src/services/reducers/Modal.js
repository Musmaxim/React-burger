import { SELECT_INGREDIENT, CLOSE_MODAL_INGREDIENT } from "../actions/Modal";

const initialState = {
  ingredient: null,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return { ingredient: action.ingredient };
    }
    case CLOSE_MODAL_INGREDIENT: {
      return { ingredient: null };
    }
    default: {
      return state;
    }
  }
};
