import { createSlice } from "@reduxjs/toolkit";
import { TUserState } from "../../utils/types";

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
