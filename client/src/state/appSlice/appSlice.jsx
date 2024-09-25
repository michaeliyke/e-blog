import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
  name: "app",
  initialState: {
    card: {
      signin: false,
      signup: false,
    },
    data: [],
  },
  reducers: {
    removeItem: (state, action) => {
      // Update state.data by filtering out the post with the matching key (post._id)
      state.data = state.data.filter(
        (post) => post.blog._id !== action.payload
      );
    },
    appendToData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    resetData: (state) => {
      state.data = [];
    },
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

export const {
  toggleSignIn,
  toggleSignUp,
  clearSign,
  removeItem,
  appendToData,
  resetData,
} = visibilitySlice.actions;

export default visibilitySlice.reducer;
