import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../util/Tools";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    clearUser: (state) => {
      // This reducer is called to clear the user from the store
      // and sets isAuthenticated to false
      (state.isAuthenticated = false), (state.user = null);
    },
  },
  extraReducers: (builder) => {
    // This reducer sends a request to the backend to check if the jwt token is valid
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async () => {
    // This is the function that the reducer will use to check the jwt token
    const res = await request.get("http://127.0.0.1:3000/auth/@me");
    if (res.status !== 200) throw new Error();
    return res.data.user;
  }
);

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
