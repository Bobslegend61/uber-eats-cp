import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  loading: boolean;
} = { loading: false };

export const activityLoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setActivityLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setActivityLoader } = activityLoaderSlice.actions;

export const selectActivityLoader = (state: RootState) => state.loader.loading;

const setActivityLoaderReducer = activityLoaderSlice.reducer;

export default setActivityLoaderReducer;
