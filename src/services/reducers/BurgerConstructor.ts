import { Category } from "../../utils/data";
import { TConstructorState } from "../../utils/types";
import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
  TBurgerConstructorActions,
} from "../actions/BurgerConstructor";

const initialState: TConstructorState = {
  bun: null,
  another: [],
};

export const constructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return action.ingredient.type === Category.BUN
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
    case CLEAR_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
