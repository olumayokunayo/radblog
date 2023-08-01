import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import blogReducer from "./slice/blogSlice";
import showReducer from "./slice/showSlice";
import postReducer from "./slice/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  show: showReducer,
  post: postReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
