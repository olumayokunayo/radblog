import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  image: null,
  content: "",
  duration: "",
  categories: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    SAVE_BLOG_DATA(state, action) {
      const { title, image, content, duration, categories } = action.payload;
      state.title = title;
      state.image = image;
      state.content = content;
      state.duration = duration;
      state.categories = categories;
    },
  },
});

export const { SAVE_BLOG_DATA } = blogSlice.actions;

export const selectTitle = (state) => state.blog.title;
export const selectImage = (state) => state.blog.image;
export const selectContent = (state) => state.blog.content;
export const selectDuration = (state) => state.blog.duration;
export const selectCategories = (state) => state.blog.categories;

export default blogSlice.reducer;
