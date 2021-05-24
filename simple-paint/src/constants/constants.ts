import { ShapeType } from '../models/shape';

export const borderWidth = 3;
export const lineHeight = 1;
export const toolbarWidth = 70;
export const defaultDimensions = {
  start: {
    x: 0,
    y: 0,
  },
  current: {
    x: 0,
    y: 0,
  },
};
export const defaultShapeType = ShapeType.LINE;
export const defaultShape = {
  id: '',
  dimensions: defaultDimensions,
  shapeType: defaultShapeType,
};