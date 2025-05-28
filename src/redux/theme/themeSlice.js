import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialVariable = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialVariable,

  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },




});

export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer;



