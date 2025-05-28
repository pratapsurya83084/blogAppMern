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

    signInFailure: (state,action) => {
       state.currentUser = action.payload;
      state.Loading = false;
     
    },
  },
});

export const { signInStart, SignInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
