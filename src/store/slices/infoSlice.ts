import { createSlice } from "@reduxjs/toolkit";

interface InfoState {
  horseAnimationFinished: boolean;
}

const initialState: InfoState = {
  horseAnimationFinished: false,
};

const infoSlice = createSlice({
  name: "infoSlice",
  initialState,
  reducers: {
    setHorseAnimationFinished(state, action) {
      state.horseAnimationFinished = action.payload;
    },
  },
});

export const { setHorseAnimationFinished } = infoSlice.actions;
export default infoSlice.reducer;
