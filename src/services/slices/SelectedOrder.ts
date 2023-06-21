import { createSlice } from "@reduxjs/toolkit";
import { TSelectedOrderState } from "../../utils/types";

const initialState: TSelectedOrderState = {
  order: null,
};

export const selectedOrderSlice = createSlice({
  name: "selectedOrder",
  initialState,
  reducers: {
    selectOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { selectOrder, clearOrder } = selectedOrderSlice.actions;

export const selectedOrderReducer = selectedOrderSlice.reducer;
