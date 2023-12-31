import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  displayName: null,
  userId: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, uid, displayName } = action.payload;
      state.userId = uid; 
      state.email = email;
      state.displayName = displayName;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.username = null;
      state.userId = null;
    },
    signup: (state, action) => {
      const { firstName, lastName, uid, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.userId = uid;
    },
    user_name: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { login, logout, user_name, signup, selectedInterests } =
  authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.userId; // Updated selector name
export const selectDisplayName = (state) => state.auth.displayName;

export default authSlice.reducer;
