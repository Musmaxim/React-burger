import { Dispatch } from "redux";
import { getFetch } from "../../utils/getFetch";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_CLOSE = "FORGOT_PASSWORD_CLOSE";

type TForgotPasswordRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};
type TForgotPasswordSuccess = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};
type TForgotPasswordFailed = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
};
type TForgotPasswordClose = {
  readonly type: typeof FORGOT_PASSWORD_CLOSE;
};
export type TForgotPasswordActions =
  | TForgotPasswordRequest
  | TForgotPasswordSuccess
  | TForgotPasswordFailed
  | TForgotPasswordClose;

export const forgotPassword = (email: string) => (dispatch: Dispatch) => {
  if (email) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    (async () => {
      try {
        await getFetch("password-reset", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      } catch {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      }
    })();
  }
};
