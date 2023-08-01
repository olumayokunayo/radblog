import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: true,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    SHOW_WRITE_POST(state, action) {
      state.isShown = action.payload;
    },
  },
});

export const { SHOW_WRITE_POST } = showSlice.actions;
export const selectIsShown = (state) => state.show.isShown;
export default showSlice.reducer;
