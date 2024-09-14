import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/AuthSlice";
import visibilityReducer from "./appSlice/appSlice";

export const store = configureStore({
  // configure a redux store using configureStore
  reducer: {
    auth: authReducer,
    app: visibilityReducer,
  },
});
