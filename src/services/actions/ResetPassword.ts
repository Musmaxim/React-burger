import { Dispatch } from "redux";
import { getFetch } from "../../utils/getFetch";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_CLOSE = "RESET_PASSWORD_CLOSE";

type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};
type TResetPasswordFailed = {
  readonly type: typeof RESET_PASSWORD_FAILED;
};
type TResetPasswordClose = {
  readonly type: typeof RESET_PASSWORD_CLOSE;
};
export type TResetPasswordActions =
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordFailed
  | TResetPasswordClose;

type TPassword = {
  password: string;
  token: string;
};

export const resetPassword =
  ({ password, token }: TPassword) =>
  (dispatch: Dispatch) => {
    if (password && token) {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      (async () => {
        try {
          await getFetch("password-reset/reset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, token }),
          });
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        } catch {
          dispatch({
            type: RESET_PASSWORD_FAILED,
          });
        }
      })();
    }
  };
