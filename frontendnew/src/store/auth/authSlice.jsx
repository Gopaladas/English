import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    isloading: false,
    backend_url:"https://english-ashy.vercel.app",
  },
  reducers: {
    startloading: (state) => {
      state.isloading = true;
    },
    stoploading: (state) => {
      state.isloading = false;
    },
    loggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.isloading = false;
      state.user = action.payload; // Store user data
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
      state.isloading = false;
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut, startloading, stoploading } =
  authSlice.actions;
export default authSlice.reducer;
