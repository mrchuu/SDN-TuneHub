import { createSlice } from "@reduxjs/toolkit";
export const playerSlice = createSlice({
  name: "auth",
  initialState: {
    isPlaying: false,
    currentSong: {},
    volume: 50,
    progress: 0,
    songQueue: [],
    queueIndex: 0
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
    },
    addSongToQueue: (state, action) =>{
      state.songQueue = [...state.songQueue, action.payload]
    },
    removeSongFromQueue: (state, action) =>{
      state.songQueue.filter((item) => item.id !== action.payload)
    },
    setQueueIndex: (state, action) =>{
      state.queueIndex = action.payload;
    },
    finishSong: (state, action) =>{
      if(state.queueIndex+2< state.songQueue.length){
        state.queueIndex += 1;
        state.currentSong = state.songQueue[state.queueIndex]
      }
    } 
  },
});
//hehe
export const { toogleIsPlaying, setCurrentSong, changeVolume, updateProgress } =
  playerSlice.actions;
export default playerSlice.reducer;
