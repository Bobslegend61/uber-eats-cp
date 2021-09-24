import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ITheme {
  theme: "light" | "dark";
}

const initialState: ITheme = { theme: "light" };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selelctTheme = (state: RootState) => state.theme.theme;

const themeReducer = themeSlice.reducer;

export default themeReducer;
