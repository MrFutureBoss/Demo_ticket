import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SplitterState } from "../interfaces/splitter";

const initialState: SplitterState = {
  loading: false,
  isLeftVisible: true,
};

const splitterSlice = createSlice({
  name: "splitter",
  initialState,
  reducers: {
    toggleLeftVisibility: (state) => {
      return {
        ...state,
        isLeftVisible: !state.isLeftVisible,
        loading: true,
      };
    },
    setLeftVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLeftVisible: action.payload,
        loading: true,
      };
    },
  },
  extraReducers: () => {},
});

export const { toggleLeftVisibility, setLeftVisibility } =
  splitterSlice.actions;
export default splitterSlice.reducer;
