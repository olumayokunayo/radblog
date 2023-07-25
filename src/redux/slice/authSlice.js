import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, firstName, lastName } = action.payload;
      state.isLoggedIn = true;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
