import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
  name: "app",
  initialState: {
    card: {
      signin: false,
      signup: false,
    },
  },
  reducers: {
    toggleSignIn: (state) => {
      state.card = {
        signin: true,
        signup: false,
      };
    },
    toggleSignUp: (state) => {
      state.card = {
        signin: false,
        signup: true,
      };
    },
    clearSign: (state) => {
      state.card = {
        signin: false,
        signup: false,
      };
    },
  },
});

export const { toggleSignIn, toggleSignUp, clearSign } =
  visibilitySlice.actions;

export default visibilitySlice.reducer;
