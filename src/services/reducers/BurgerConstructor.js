import { BUN } from "../../utils/data";

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from "../actions/BurgerConstructor";

const initialState = {
  bun: null,
  another: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return action.ingredient.type === BUN
        ? {
            ...state,
            bun: action.ingredient,
          }
        : {
            ...state,
            another: state.another.concat(action.ingredient),
          };
    }
    case REMOVE_INGREDIENT: {
      const index = state.another.indexOf(action.ingredient);
      const newArr = [...state.another];
      newArr.splice(index, 1);
      return {
        ...state,
        another: newArr,
      };
    }
    case SORT_INGREDIENT: {
      const newArr = [...state.another];
      const dragItem = newArr[action.dragIndex];
      newArr.splice(action.dragIndex, 1);
      newArr.splice(action.hoverIndex, 0, dragItem);
      return {
        ...state,
        another: newArr,
      };
    }
    default: {
      return state;
    }
  }
};
