import axios from "axios";

const API_URL = "https://api.realworld.io/api/";

let accesstoken = JSON.stringify(localStorage.getItem("accessToken"));
accesstoken = accesstoken.replace(/^"(.*)"$/, "$1");

export const getComments = (slug) => (dispatch) => {
  return axios
    .get(API_URL + `articles/${slug}/comments`, {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({
        type: "GET_COMMENTS_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) => dispatch({ type: "GET_COMMENTS_ERROR", payload: error }));
};

export const postComments = (slug, body) => (dispatch) => {
  return axios
    .post(
      API_URL + `articles/${slug}/comments`,
      { comment: { body } },
      {
        headers: { Authorization: "Token " + accesstoken },
      }
    )
    .then((response) =>
      dispatch({
        type: "POST_COMMENTS_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({ type: "POST_COMMENTS_ERROR", payload: error })
    );
};

export const deleteComments = (slug, id) => (dispatch) => {
  return axios
    .delete(API_URL + `articles/${slug}/comments/${id}`, {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({
        type: "DELETE_COMMENTS_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({ type: "DELETE_COMMENTS_ERROR", payload: error })
    );
};
