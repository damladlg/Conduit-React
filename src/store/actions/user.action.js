import axios from "axios";

const API_URL = "https://api.realworld.io/api/";

let accesstoken = JSON.stringify(localStorage.getItem("accessToken"));
accesstoken = accesstoken.replace(/^"(.*)"$/, "$1");

export const userUpdateSettings = (username, email, password, bio, image) => (
  dispatch
) => {
  return axios
    .put(
      API_URL + "user",
      {
        user: { username, email, password, bio, image },
      },
      { headers: { Authorization: "Token " + accesstoken } }
    )
    .then((response) =>
      dispatch({ type: "PUT_USER_SETTINGS_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "PUT_USER_SETTINGS_ERROR", payload: error })
    );
};

export const getUserProfile = (username) => (dispatch) => {
  return axios
    .get(API_URL + "profiles/" + username)
    .then((response) =>
      dispatch({ type: "GET_USER_PROFILE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "GET_USER_PROFILE_ERROR", payload: error })
    );
};

export const getUser = () => (dispatch) => {
  return axios
    .get(API_URL + "user", {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({ type: "GET_USER_SUCCESS", payload: response.data })
    )
    .catch((error) => dispatch({ type: "GET_USER_ERROR", payload: error }));
};
