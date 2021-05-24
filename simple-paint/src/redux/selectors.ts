import { IShape, ShapeType } from '../models/shape';
import { RootState } from './store';

export const selectSelectedShapeType = (state: RootState): ShapeType => state.rootReducer.selectedShapeType;
export const selectShapes = (state: RootState): IShape[] => state.rootReducer.shapes;
export const selectSelectedShape = (state: RootState): IShape | undefined => state.rootReducer.selectedShape;