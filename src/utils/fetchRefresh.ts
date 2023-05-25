import { dataApi } from "./data";

import {checkResponse} from "./checkResponce";

export const refreshToken = () => {
  return fetch(`${dataApi}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchRefresh = async (url: string, options:RequestInit & {
  headers: { authorization: string };
  ["Content-Type"]: string;
}) => {
  options["Content-Type"] = "application/json";
  try {
    const res = await fetch(dataApi + url, options);
    return await checkResponse(res);
  } catch (err:any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export default fetchRefresh;
