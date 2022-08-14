const INITIAL_STATE = {
  user: [],
  message: "",
};
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "POST_REGISTER_SUCCESS":
      return { ...state, user: action.payload };
    case "POST_REGISTER_ERROR":
      return { ...state, message: action.payload };
    case "POST_LOGIN_SUCCESS":
      return { ...state, user: action.payload };
    case "POST_LOGIN_ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export default authReducer;
