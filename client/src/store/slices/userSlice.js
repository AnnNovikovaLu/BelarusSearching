import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: undefined,
  isVerified: undefined,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },

    changeIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },

    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { changeIsAuthorized, changeUserInfo, changeIsVerified } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
