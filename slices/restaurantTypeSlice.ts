import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { type: "delivery" | "pickup" } = { type: "delivery" };

export const restaurantTypeSlice = createSlice({
  name: "restaurantType",
  initialState,
  reducers: {
    setRestaurantType: (
      state,
      action: PayloadAction<"delivery" | "pickup">,
    ) => {
      state.type = action.payload;
    },
  },
});

export const { setRestaurantType } = restaurantTypeSlice.actions;

export const selelctRestaurantType = (state: RootState) =>
  state.restaurantType.type;

const restaurantTypeReducer = restaurantTypeSlice.reducer;

export default restaurantTypeReducer;
