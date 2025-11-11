import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  horseAnimationFinished: boolean;
}

const initialState: IState = {
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
