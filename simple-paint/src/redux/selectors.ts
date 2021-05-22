import { ShapeType } from '../models/shape';
import { RootState } from './store';

export const selectSelectedShape = (state: RootState): ShapeType => state.rootReducer.selectedShape;
