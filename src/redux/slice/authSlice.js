import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  displayName: null,
  user: null,
  interests: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, uid, displayName } = action.payload;
      state.user = uid;
      state.email = email;
      state.displayName = displayName;
      state.isLoggedIn = true;
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
      const { firstName, lastName, uid, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email
      state.user = uid;
    },
    user_name: (state, action) => {
      state.username = action.payload;
    },
    selectedInterests: (state,action) => {
      console.log(action.payload);
      state.interests = action.payload
    }
  },
});

export const { login, logout, user_name, signup, selectedInterests } =
  authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.username;
export const selectUser = (state) => state.auth.user;
export const selectDisplayName = (state) => state.auth.displayName;
export const selectInterests = (state) => state.auth.interests;

export default authSlice.reducer;
