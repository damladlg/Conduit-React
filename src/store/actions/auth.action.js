import axios from "axios";

const API_URL = "https://api.realworld.io/api/";

export const postRegister = (username, email, password) => (dispatch) => {
  return axios
    .post(API_URL + "users", { user: { username, email, password } })
    .then((response) =>
      dispatch({ type: "POST_REGISTER_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "POST_REGISTER_ERROR", payload: error })
    );
};

export const postLogin = (credentials) => (dispatch) => {
  return axios
    .post(API_URL + "users/login", { user: credentials })
    .then((response) =>
      dispatch({ type: "POST_LOGIN_SUCCESS", payload: response.data })
    )
    .catch((error) => dispatch({ type: "POST_LOGIN_ERROR", payload: error }));
};
