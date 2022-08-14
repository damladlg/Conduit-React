const INITIAL_STATE = {
  user: [],
  message: "",
};
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PUT_USER_SETTINGS_SUCCESS":
      return { ...state, user: action.payload };
    case "PUT_USER_SETTINGS_ERROR":
      return { ...state, message: action.payload };
    case "GET_USER_PROFILE_SUCCESS":
      return { ...state, user: action.payload };
    case "GET_USER_PROFILE_ERROR":
      return { ...state, message: action.payload };
    case "GET_USER_SUCCESS":
      return { ...state, user: action.payload };
    case "GET_USER_ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export default userReducer;
