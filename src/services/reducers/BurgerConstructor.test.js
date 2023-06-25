import { constructorReducer } from './BurgerConstructor';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SORT_INGREDIENT,
    CLEAR_INGREDIENT
} from '../actions/BurgerConstructor';
import { initialState } from './BurgerConstructor';
import { data } from '../../../cypress/fixtures/ingredients.json';
import { Category } from '../../utils/data';

describe('constructor reducer', () => {
    it('инициализация', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState);
    });

    const bun = data.find(item => item.type === Category.BUN);
    const ingredient1 = data.find(item => item.type === Category.SAUCE);
    const ingredient2 = data.find(item => item.type === Category.MAIN);

    describe('Добавление ингредиентов', () => {
        it('добавление булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: bun
                })
            ).toEqual({
                ...initialState,                
                bun
            });
        });

        it('добавление ингредиента, отличного от булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: ingredient1
                })
            ).toEqual({
                ...initialState,
                another: [ingredient1]
            });
        });
    });

    it('удаление ингредиента', () => {
        expect(
            constructorReducer({
                bun,
                another: [ingredient1, ingredient2]
            }, {
                type: REMOVE_INGREDIENT,
                ingredient: ingredient1
            })
        ).toEqual({
            bun,
            another: [ingredient2]
        });
    });     

    it('перемещение ингредиентов', () => {
        expect(
            constructorReducer({
                bun,
                another: [ingredient1, ingredient2]
            }, {
                type: SORT_INGREDIENT,
                dragIndex: 0,
                hoverIndex: 1
            })
        ).toEqual({
            bun,
            another: [ingredient2, ingredient1]
        });
    });

    it('удаление всех ингредиентов', () => {
        expect(
            constructorReducer({
                bun,
                another: [ingredient1, ingredient2]
            }, {
                type: CLEAR_INGREDIENT
            })
        ).toEqual(initialState);
    });
});