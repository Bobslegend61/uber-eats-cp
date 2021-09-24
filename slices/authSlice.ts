import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  darkMode?: boolean;
  email: string;
}

export interface IUserState {
  loaded: boolean;
  user: UserData | null;
}

const initialState: IUserState = {
  loaded: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.loaded = true;
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
