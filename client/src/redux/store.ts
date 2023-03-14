import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/post/postSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
