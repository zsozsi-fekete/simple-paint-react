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

const swapRectangleCorners = (shape: IShape): IShape => {
  const { dimensions: { start, current }, shapeType } = shape;
  if (shapeType !== ShapeType.RECTANGLE) return shape;
  return {
    ...shape,
    dimensions: {
      start: {
        x: current.x < start.x ? current.x : start.x,
        y: current.y < start.y ? current.y : start.y,
      },
      current: {
        x: current.x >= start.x ? current.x : start.x,
        y: current.y >= start.y ? current.y : start.y,
      }
    }
  };
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    selectShapeType: (state, action: PayloadAction<ShapeType>) => {
      state.selectedShapeType = action.payload;
    },
    addShape: (state, action: PayloadAction<IShape>) => {
      state.shapes.push(swapRectangleCorners(action.payload));
      state.selectedShape = undefined;
    },
    selectShape: (state, action: PayloadAction<string>) => {
      if (state.selectedShape) {
        state.shapes.push(state.selectedShape);
      }
      state.selectedShape = state.shapes.find(s => s.id === action.payload);
      state.shapes = state.shapes.filter(s => s.id !== action.payload);
    },
    clearSelectedShape: (state) => {
      if (state.selectedShape) {
        state.shapes.push(state.selectedShape);
      }
      state.selectedShape = undefined;
    },
    deleteShape: (state) => {
      state.selectedShape = undefined;
    },
    updateSelectedShape: (state, action: PayloadAction<IShape>) => {
      state.selectedShape = swapRectangleCorners(action.payload);
    },
  }
});

export const { selectShapeType, addShape, selectShape, clearSelectedShape, deleteShape, updateSelectedShape } = slice.actions;
export const rootReducer = slice.reducer;