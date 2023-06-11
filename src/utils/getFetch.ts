import { dataApi } from "./data";
import {checkResponse} from "./checkResponce";

export const getFetch = (url: string, body: Body) => {
  return fetch(dataApi + url, body).then(checkResponse);
};

export default getFetch;
