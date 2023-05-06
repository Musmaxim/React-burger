import { dataApi } from "./data";
import getCheckResponse from "./checkResponce";

const getFetch = async (url, body) => {
  let response = null;
  try {
    if (body) {
      response = await fetch(dataApi + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      response = await fetch(dataApi + url);
    }

    const checkResponse = await getCheckResponse(response);
    const data = await checkResponse.json();
    return data;
  } catch (error) {
    alert("error-fetch!" + " >>> " + error);
  }
};
export default getFetch;
