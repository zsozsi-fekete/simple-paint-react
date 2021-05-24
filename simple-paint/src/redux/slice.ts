/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultShapeType } from '../constants/constants';
import { IShape, ShapeType } from '../models/shape';

export interface IRootState {
  selectedShapeType: ShapeType;
  selectedShape?: IShape;
  shapes: IShape[];
}

const initialState: IRootState = {
  selectedShapeType: defaultShapeType,
  shapes: [],
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    selectShapeType: (state, action: PayloadAction<ShapeType>) => {
      state.selectedShapeType = action.payload;
    },
    addShape: (state, action: PayloadAction<IShape>) => {
      state.shapes.push(action.payload);
    },
    selectShape: (state, action: PayloadAction<string>) => {
      if (state.selectedShape) {
        state.shapes.push(state.selectedShape);
      }
      state.selectedShape = state.shapes.find(s => s.id === action.payload);
      state.shapes = state.shapes.filter(s => s.id !== action.payload);
    },
    deselectShape: (state, action: PayloadAction<IShape>) => {
      state.shapes.push(action.payload);
      state.selectedShape = undefined;
    }
  }
});

export const { selectShapeType, addShape, selectShape, deselectShape } = slice.actions;
export const rootReducer = slice.reducer;