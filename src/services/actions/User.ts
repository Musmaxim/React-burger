import { getFetch } from "../../utils/getFetch";
import { setAuthChecked, setUser } from "../slices/User";
import { TForm, TUser } from "../../utils/types";
import { AppDispatch } from "../../store/Store";

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
  }
};

export const getUser = () => (dispatch: AppDispatch) => {
  (async () => {
    try {
      const res = await getFetch("auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      dispatch(setUser(res.user));
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  })();
};

export const patchUser = (body: any) => (dispatch: AppDispatch) => {
  (async () => {
    try {
      const res = await getFetch("auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: body && JSON.stringify(body),
      });
      dispatch(setUser(res.user));
    } catch {}
  })();
};

export const register =
  ({ name, email, password }: TUser) =>
  (dispatch: AppDispatch) => {
    if (name && email && password) {
      (async () => {
        try {
          const res = await getFetch("auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });
          const { user, accessToken, refreshToken } = res;
          const accessTokenWithoutBearer = accessToken.split("Bearer ")[1];
          localStorage.setItem("accessToken", accessTokenWithoutBearer);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch(setUser(user));
          dispatch(setAuthChecked(true));
        } catch {}
      })();
    }
  };

export const login =
  ({ email, password }: TForm) =>
  (dispatch: AppDispatch) => {
    if (email && password) {
      (async () => {
        try {
          const res = await getFetch("auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const { user, accessToken, refreshToken } = res;
          const accessTokenWithoutBearer = accessToken.split("Bearer ")[1];
          localStorage.setItem("accessToken", accessTokenWithoutBearer);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch(setUser(user));
          dispatch(setAuthChecked(true));
        } catch {}
      })();
    }
  };

export const logout = () => (dispatch: AppDispatch) => {
  (async () => {
    try {
      await getFetch("auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("refreshToken"),
        }),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setAuthChecked(false));
    } catch {}
  })();
};
