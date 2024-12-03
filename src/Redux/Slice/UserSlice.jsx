import { createSlice } from "@reduxjs/toolkit";

// Create a Initial State :
const initialState = {
  CurrentUser: null,
  Error: null,
  Loading: false,
};

//Create User Slice :
const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    SignUpStart: (state) => {
      state.Loading = true;
      state.Error = null;
    },
    SignUpFail: (state, action) => {
      state.Loading = false;
      state.Error = action.payload;
    },
    SignUpSuccess: (state, action) => {
      state.Loading = false;
      state.CurrentUser = action.payload;
      state.Error = null;
    },
    SignInStart: (state) => {
      state.Loading = true;
      state.Error = null;
    },
    SignInFail: (state, action) => {
      state.Loading = false;
      state.Error = action.payload;
    },
    SignInSuccess: (state, action) => {
      state.Loading = false;
      state.CurrentUser = action.payload;
      state.Error = null;
    },
    UpdateStart: (state) => {
      state.Loading = true;
      state.Error = null;
    },
    UpdateFail: (state, action) => {
      state.Loading = false;
      state.Error = action.payload;
    },
    UpdateSuccess: (state, action) => {
      state.Loading = false;
      state.CurrentUser.Result = action.payload;
      state.Error = null;
    },
    SignOutSuccess: (state) => {
      state.Loading = false;
      state.CurrentUser = null;
      state.Error = null;
    },
    deleteUserStart: (state) => {
      state.Loading = true;
      state.Error = null;
    },
    deleteUserSuccess: (state) => {
      state.CurrentUser = null;
      state.Loading = false;
      state.Error = null;
    },
    deleteUserFail: (state, action) => {
      state.Loading = false;
      state.Error = action.payload;
    },
  },
});

export const {
  SignUpStart,
  SignUpSuccess,
  SignUpFail,
  SignInStart,
  SignInFail,
  SignInSuccess,
  UpdateStart,
  UpdateFail,
  UpdateSuccess,
  SignOutSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} = UserSlice.actions;

export default UserSlice.reducer;
