import { createSlice } from "@reduxjs/toolkit";
export const searchSlide = createSlice({
  name: "search",
  initialState: {
    data: [],
    dataLenght: false
  },

  reducers: {
    addData: (state, action) => {
      state.data = action.payload
      state.dataLenght = true
    },
    clearData: (state, action) => {
      state.data = [];
      state.dataLenght = false
    }
  },
});
export const { addData, clearData } = searchSlide.actions;
export default searchSlide.reducer;
