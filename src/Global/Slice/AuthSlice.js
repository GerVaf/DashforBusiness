import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: {},
  access: {},
};

export const userSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    collectInfo: (state, { payload }) => {
      state.user_info = payload;
    },
    accessInfo: (state, { payload }) => {
      state.access = payload;
    },
    logOut: (state, { payload }) => {
      state.user_info = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { collectInfo, logOut, accessInfo } = userSlice.actions;

export default userSlice.reducer;
