import { combineReducers } from "redux";

import authReducer, * as fromRegisterReducer from "./auth.reducer";
import userReducer, * as fromUserReducer from "./user.reducer";
import articleReducer, * as fromArticleReducer from "./article.reducer";
import commentReducer, * as fromCommentReducer from "./comment.reducer";
import tagReducer, * as fromTagReducer from "./tag.reducer";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  article: articleReducer,
  comment: commentReducer,
  tag: tagReducer,
});

export {
  reducers,
  fromRegisterReducer,
  fromUserReducer,
  fromArticleReducer,
  fromCommentReducer,
  fromTagReducer,
};
