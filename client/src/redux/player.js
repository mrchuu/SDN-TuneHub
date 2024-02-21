import { createSlice } from "@reduxjs/toolkit";
export const playerSlice = createSlice({
  name: "auth",
  initialState: {
    isPlaying: false,
    currentSong: {},
    volume: 50,
    progress: 0
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
    updateProgress: (state, action) =>{
      state.progress = action.payload
    }
  },
});
export const { toogleIsPlaying, setCurrentSong, changeVolume, updateProgress } =
  playerSlice.actions;
export default playerSlice.reducer;
