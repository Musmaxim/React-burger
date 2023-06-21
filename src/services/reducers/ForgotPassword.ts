import {
  FORGOT_PASSWORD_CLOSE,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  TForgotPasswordActions,
} from "../actions/ForgotPassword";

const initialState = {
  request: false,
  success: false,
  failed: false,
};

export const forgotPasswordReducer = (
  state = initialState,
  action: TForgotPasswordActions
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        failed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: true,
        request: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        failed: true,
        request: false,
      };
    }
    case FORGOT_PASSWORD_CLOSE: {
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
