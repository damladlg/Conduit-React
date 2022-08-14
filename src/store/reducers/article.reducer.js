const INITIAL_STATE = {
  article: [],
  message: "",
};
function articleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CREATE_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "CREATE_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "GET_FEED_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "GET_FEED_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "GET_GLOBAL_FEED_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "GET_GLOBAL_FEED_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "GET_YOUR_FEED_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "GET_YOUR_FEED_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "GET_ARTICLES_SUCCESS":
      return { ...state, article: action.payload };
    case "GET_ARTICLES_ERROR":
      return { ...state, message: action.payload };
    case "DELETE_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "DELETE_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "GET_MY_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "GET_MY_ARTICLE_ERROR":
      return { ...state, message: action.payload };
    case "UPDATE_ARTICLE_SUCCESS":
      return { ...state, article: action.payload };
    case "UPDATE_ARTICLE_ERROR":
      return { ...state, message: action.payload };

    default:
      return state;
  }
}

export default articleReducer;
