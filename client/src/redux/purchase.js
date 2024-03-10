import { createSlice } from "@reduxjs/toolkit";
export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    song: null,
  },

  reducers: {
    setPurchaseSong: (state, action) => {
      state.song = { ...state.song, ...action.payload };
    },
  },
});
export const {setPurchaseSong} = purchaseSlice.actions;
export default purchaseSlice.reducer;
