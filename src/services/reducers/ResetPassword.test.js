import { resetPasswordReducer } from "./ResetPassword";
import {
    RESET_PASSWORD_CLOSE,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../actions/ResetPassword";
import { initialState } from "./ResetPassword";

describe('reset password reducer', () => {
    it('инициализация', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
    });

    it('выполнение запроса', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            request: true,
            success: false,
            failed: false
        });
    });

    it('запрос выполнен успешно', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_SUCCESS
        })).toEqual({
            ...initialState,
            success: true,
            request: false
        });
    });

    it('запрос не выполнен', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            failed: true,
            request: false
        });
    });

    it('выход со страницы', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_CLOSE
        })).toEqual(initialState);
    });


});