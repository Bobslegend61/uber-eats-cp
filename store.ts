import { configureStore } from "@reduxjs/toolkit";
import restaurantTypeReducer from "./slices/restaurantTypeSlice";

export const store = configureStore({
  reducer: {
    restaurantType: restaurantTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
