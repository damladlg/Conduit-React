const INITIAL_STATE = {
  tag: [],
  message: "",
};
function tagReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_TAG_SUCCESS":
      return { ...state, tag: action.payload };
    case "GET_TAG_ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export default tagReducer;
