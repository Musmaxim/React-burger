import { createSlice } from "@reduxjs/toolkit";
import { TOrderState } from "../../utils/types";

const initialState: TOrderState = {
  order: null,
  numbOrder: null,
  status: "idle",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderNum: (state, action) => {
      state.numbOrder = action.payload;
      state.status = "success";
    },
    clearOrderNum: (state) => {
      state.numbOrder = null;
      state.status = "idle";
    },
  },
});

export const { setStatus, setOrder, setOrderNum, clearOrderNum } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
