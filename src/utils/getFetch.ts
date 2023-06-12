import { BURGER_API } from "./data";
import { checkResponse } from "./checkResponce";

export const getFetch = (url: string, options?: RequestInit) => {
  return fetch(BURGER_API + url, options).then(checkResponse);
};

export default getFetch;
