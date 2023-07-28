import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import blogReducer from "./slice/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
