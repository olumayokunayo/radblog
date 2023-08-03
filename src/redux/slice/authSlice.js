import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  displayName: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      const { email, uid, displayName } = action.payload;
      state.user = uid;
      state.email = email;
      state.displayName = displayName;
      state.isLoggedIn = true;
      console.log(state.user, state.email, state.displayName, state.isLoggedIn);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.username = null;
    },
    signup: (state, action) => {
      console.log(action.payload);
      const { firstName, lastName, uid } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.user = uid;
      console.log(state.firstName, state.lastName, state.currentUser);
    },
    user_name: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { login, logout, user_name, signup } =
  authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.username;
export const selectUser = (state) => state.auth.user;
export const selectDisplayName = (state) => state.auth.displayName;

export default authSlice.reducer;
