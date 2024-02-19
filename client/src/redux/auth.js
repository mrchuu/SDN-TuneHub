import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userInfo: {},
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = {};
    },
 
  },
});
export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
