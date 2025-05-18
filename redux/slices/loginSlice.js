import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    tempData: null,
    accessToken: "",
    refreshToken: "",
    userData: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLogout: (state, action) => {
      state.isLogin = false;
      state.tempData = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.userData = null;
      localStorage.removeItem("estate_loop_token");
    },
    handleLogin: (state, action) => {
      state.userData = action.payload;
    },
    handleUserData: (state, action) => {
      state.updated = action.payload;
    },
  },
});

export const {
  setLogin,
  handleLogin,
  setLogout,
  setTempData,
  setAccessToken,
  setRefreshToken,
  handleUserData,
  setUserData,
} = authSlice.actions;

export default authSlice.reducer;
