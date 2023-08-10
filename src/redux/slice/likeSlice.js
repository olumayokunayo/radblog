import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedPosts: [],
  bookmarkedPost: [],
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    SET_LIKED_POST: (state, action) => {
      state.likedPosts = action.payload;
    },
    TOGGLE_LIKED_POST: (state, action) => {
      const postId = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
    },
  },
});

export const { SET_LIKED_POST, TOGGLE_LIKED_POST } = likeSlice.actions;
export const selectLikedPosts = (state) => state.likes.likedPosts;
export const selectBookmarkedPosts = (state) => state.likes.bookmarkedPost;
export default likeSlice.reducer;
