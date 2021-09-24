import { configureStore } from "@reduxjs/toolkit";
import setActivityLoaderReducer from "./slices/activityLoader";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import locationReducer from "./slices/locationSlice";
import restaurantTypeReducer from "./slices/restaurantTypeSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurantType: restaurantTypeReducer,
    theme: themeReducer,
    location: locationReducer,
    cart: cartReducer,
    loader: setActivityLoaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
