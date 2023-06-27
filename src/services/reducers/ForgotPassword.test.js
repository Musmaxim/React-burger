import { forgotPasswordReducer } from "./ForgotPassword";
import {
    FORGOT_PASSWORD_CLOSE,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS
} from "../actions/ForgotPassword";
import { initialState } from "./ForgotPassword";

describe('forgot password reducer', () => { 
    it('инициализация', () => { 
        expect(forgotPasswordReducer(undefined, {})).toEqual(initialState);
    });

    it('выполнение запроса', () => { 
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            request: true,
            success: false,
            failed: false
        });
    });

    it('запрос выполнен успешно', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_SUCCESS
        })).toEqual({
            ...initialState,
            success: true,
            request: false
        });
    });

    it('запрос не выполнен', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            failed: true,
            request: false
        });
    });

    it('выход со страницы', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_CLOSE
        })).toEqual(initialState);
    });


});