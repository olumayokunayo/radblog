import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    ADD_BLOG(state, action) {
      state.blogs.push(action.payload);
    },
    SET_BLOG(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { ADD_BLOG, SET_BLOG} = postSlice.actions;
export const selectBlogs = (state) => state.post.blogs;
export default postSlice.reducer;
