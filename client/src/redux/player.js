import { createSlice } from "@reduxjs/toolkit";
export const playerSlice = createSlice({
  name: "auth",
  initialState: {
    isPlaying: false,
    currentSong: {},
    volume: 50,
  },

  reducers: {
    toogleIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setCurrentSong: (state, action) => {
      state.currentSong = { ...state.currentSong, ...action.payload };
    },
    changeVolume: (state, action) => {
      state.volume = action.payload;
      // console.log(state.volume);
    },
    
  },
});
export const { toogleIsPlaying, setCurrentSong, changeVolume } =
  playerSlice.actions;
export default playerSlice.reducer;
