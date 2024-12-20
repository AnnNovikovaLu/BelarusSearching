
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: '',
  interests: [],
  image: '',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      state.description = action.payload.description;
      state.interests = action.payload.interests;
      state.image = action.payload.image;
    },
  },
});

export const { changeProfile } = profileSlice.actions;
export default profileSlice.reducer;

  