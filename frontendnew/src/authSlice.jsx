// authSlice.js (or authReducer.js)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch login status
export const fetchLoginStatus = createAsyncThunk(
  "auth/fetchLoginStatus",
  async () => {
    const response = await axios.get("/api/admin/isLoggedIn");
    return {
      isLoggedIn: response.data.isLoggedIn,
      user: response.data.user,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginStatus.pending, (state) => {
        state.loading = true;
        // state.isLoggedIn = false;
      })
      .addCase(fetchLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
      })
      .addCase(fetchLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
