import { createStore, combineReducers, applyMiddleware } from "redux";
import { postReducer } from "./reducers/postReducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  posts: postReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
