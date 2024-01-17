import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

const rootReducer: any = combineReducers({
  posts: posts,
  auth: auth,
});

export default rootReducer;
// export default combineReducers({
//   posts;
// });
