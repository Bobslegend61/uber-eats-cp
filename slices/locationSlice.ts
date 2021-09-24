import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "react-native-google-places-autocomplete";
import { RootState } from "../store";

const initialState: {
  location: string;
  geometry: Point | null;
} = { location: "", geometry: null };

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },

    setGeometry: (state, action: PayloadAction<Point>) => {
      state.geometry = action.payload;
    },
  },
});

export const { setLocation, setGeometry } = locationSlice.actions;

export const selelctLocation = (state: RootState) => state.location.location;
export const selectGeometry = (state: RootState) => state.location.geometry;

const locationReducer = locationSlice.reducer;

export default locationReducer;
