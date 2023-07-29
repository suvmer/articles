import { createStore, combineReducers, applyMiddleware } from "redux";
import { postReducer } from "./reducers/postReducer";
import { commentReducer } from "./reducers/commentReducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  posts: postReducer,
  comments: commentReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;