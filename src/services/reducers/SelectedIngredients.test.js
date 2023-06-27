import { selectedIngredientReducer } from './SelectedIngredients';
import {
    SELECT_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT
} from '../actions/SelectedIngredients';
import { data } from '../../../cypress/fixtures/ingredients.json';
import { initialState } from './SelectedIngredients';

describe('selected ingredient reducer', () => {
    it('инициализация', () => {
        expect(selectedIngredientReducer(undefined, {})).toEqual(initialState);
    });

    const ingredient = data[0];

    it('выбор ингредиента', () => {
        expect(selectedIngredientReducer(undefined, {
            type: SELECT_INGREDIENT,
            ingredient
        })).toEqual({
            ingredient
        });
    });

    it('очистка выбранного ингредиента', () => {
        expect(selectedIngredientReducer({
            ingredient
        }, {
            type: CLEAR_SELECTED_INGREDIENT,
            ingredient
        })).toEqual(initialState);
    });
});