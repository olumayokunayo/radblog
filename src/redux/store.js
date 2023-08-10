import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import blogReducer from "./slice/blogSlice";
import showReducer from "./slice/showSlice";
import postReducer from "./slice/postSlice";
import likeReducer from "./slice/likeSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  show: showReducer,
  post: postReducer,
  likes: likeReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
