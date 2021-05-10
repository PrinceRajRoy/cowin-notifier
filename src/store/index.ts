import { configureStore } from "@reduxjs/toolkit";
import centerReducer from "./reducers/index";

export const store = configureStore({
  reducer: centerReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.getState;
