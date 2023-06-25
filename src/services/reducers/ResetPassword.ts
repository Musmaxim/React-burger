import {
  RESET_PASSWORD_CLOSE,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TResetPasswordActions,
} from "../actions/ResetPassword";

export const initialState = {
  request: false,
  success: false,
  failed: false,
};

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        failed: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: true,
        request: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        failed: true,
        request: false,
      };
    }
    case RESET_PASSWORD_CLOSE: {
      return {
        ...state,
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};
