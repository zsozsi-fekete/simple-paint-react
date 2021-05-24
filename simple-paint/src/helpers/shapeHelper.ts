import { defaultDimensions } from '../constants/constants';
import { IShape, ShapeType } from '../models/shape';

export const getNewShape = (shapeType: ShapeType): IShape => ({
  id: '',
  dimensions: defaultDimensions,
  selected: false,
  shapeType,
});