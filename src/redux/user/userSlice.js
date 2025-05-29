import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  Loading: false,
};

const userSlice = createSlice({
  //slicename
  name: "user",
  initialState,
  reducers: {
    //actions below
    signInStart: (state) => {
      state.Loading = true;
    },

    SignInSuccess: (state, action) => {
      state.currentUser = action.payload; //assign currentUser to payload value
      state.Loading = false;
    },

    signInFailure: (state, action) => {
      state.currentUser = action.payload;
      state.Loading = false;
    },
    UpdateStart: (state) => {
      state.Loading = true;
    },

    UpdateSuccess: (state, action) => {
      state.Loading = false;
      state.currentUser = action.payload;
    },
    UpdateFailure: (state) => {
      state.Loading = false;
    },
    DeleteUser: (state) => {
      state.currentUser = null;
      state.Loading = false;
    },
  },
});

export const {
  signInStart,
  SignInSuccess,
  signInFailure,
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
  DeleteUser,
} = userSlice.actions;
export default userSlice.reducer;
