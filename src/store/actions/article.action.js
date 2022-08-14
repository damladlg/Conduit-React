import axios from "axios";

const API_URL = "https://api.realworld.io/api/";

let accesstoken = JSON.stringify(localStorage.getItem("accessToken"));
accesstoken = accesstoken.replace(/^"(.*)"$/, "$1");

export const createArticle = (title, description, body, tagList) => (
  dispatch
) => {
  return axios
    .post(
      API_URL + "articles",
      {
        article: { title, description, body, tagList },
      },
      { headers: { Authorization: "Token " + accesstoken } }
    )
    .then((response) =>
      dispatch({ type: "CREATE_ARTICLE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "CREATE_ARTICLE_ERROR", payload: error })
    );
};

export const getFeedArticle = () => (dispatch) => {
  return axios
    .get(API_URL + "articles/feed?limit=20&offset=0", {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({ type: "GET_FEED_ARTICLE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "GET_FEED_ARTICLE_ERROR", payload: error })
    );
};

export const getGlobalFeedArticle = () => (dispatch) => {
  return axios
    .get(API_URL + "articles?limit=20&offset=0")
    .then((response) =>
      dispatch({
        type: "GET_GLOBAL_FEED_ARTICLE_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({ type: "GET_GLOBAL_FEED_ARTICLE_ERROR", payload: error })
    );
};

export const getYourFeedArticle = () => (dispatch) => {
  return axios
    .get(API_URL + "articles/feed?limit=20&offset=0", {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({
        type: "GET_GLOBAL_FEED_ARTICLE_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({ type: "GET_GLOBAL_FEED_ARTICLE_ERROR", payload: error })
    );
};

export const getArticles = (slug) => (dispatch) => {
  return axios
    .get(API_URL + `articles/${slug}`)
    .then((response) =>
      dispatch({
        type: "GET_ARTICLES_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) => dispatch({ type: "GET_ARTICLES_ERROR", payload: error }));
};

export const deleteArticle = (slug) => (dispatch) => {
  return axios
    .delete(API_URL + `articles/${slug}`, {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({
        type: "DELETE_ARTICLE_SUCCESS",
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({ type: "DELETE_ARTICLE_ERROR", payload: error })
    );
};

export const getMyArticle = (username) => (dispatch) => {
  return axios
    .get(API_URL + `articles?author=${username}&limit=5&offset=0`, {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({ type: "GET_MY_ARTICLE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "GET_MY_ARTICLE_ERROR", payload: error })
    );
};

export const getFavoritedArticle = (username) => (dispatch) => {
  return axios
    .get(API_URL + `articles?favorited=${username}&limit=5&offset=0`, {
      headers: { Authorization: "Token " + accesstoken },
    })
    .then((response) =>
      dispatch({ type: "GET_MY_ARTICLE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "GET_MY_ARTICLE_ERROR", payload: error })
    );
};

export const updateArticle = (title, description, body, slug) => (dispatch) => {
  return axios
    .put(
      API_URL + `articles/${slug}`,
      {
        article: { title, description, body },
      },
      { headers: { Authorization: "Token " + accesstoken } }
    )
    .then((response) =>
      dispatch({ type: "UPDATE_ARTICLE_SUCCESS", payload: response.data })
    )
    .catch((error) =>
      dispatch({ type: "UPDATE_ARTICLE_ERROR", payload: error })
    );
};
