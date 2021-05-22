/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShapeType } from '../models/shape';

export interface IRootState {
  selectedShape: ShapeType;
}

const initialState: IRootState = {
  selectedShape: ShapeType.LINE,
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    selectShape: (state, action: PayloadAction<ShapeType>) => {
      state.selectedShape = action.payload;
    }
  }
});

export const { selectShape } = slice.actions;
export const rootReducer = slice.reducer;