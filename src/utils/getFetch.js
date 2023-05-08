import { dataApi } from "./data";
import getCheckResponse from "./checkResponce";

export const getFetch = (url, body) => {
  return fetch(dataApi + url, body).then(getCheckResponse);
};

export default getFetch;
