const INITIAL_STATE = {
  comment: [],
  message: "",
};
function commentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      return { ...state, comment: action.payload };
    case "GET_COMMENTS_ERROR":
      return { ...state, message: action.payload };
    case "POST_COMMENTS_SUCCESS":
      return { ...state, comment: action.payload };
    case "POST_COMMENTS_ERROR":
      return { ...state, message: action.payload };
    case "DELETE_COMMENTS_SUCCESS":
      return { ...state, comment: action.payload };
    case "DELETE_COMMENTS_ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export default commentReducer;
