import axios from "axios";

const API_URL = "https://api.realworld.io/api/";

export const getTag = () => (dispatch) => {
  return axios
    .get(API_URL + "tags")
    .then((response) =>
      dispatch({
        type: "GET_TAG_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) => dispatch({ type: "GET_TAG_ERROR", payload: error }));
};
