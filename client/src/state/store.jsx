import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/AuthSlice";

export const store = configureStore({
  // configure a redux store using configureStore
  reducer: {
    auth: authReducer,
  },
});
