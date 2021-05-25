import { ShapeType } from '../models/shape';

export const borderWidth = 3;
export const lineHeight = 3;
export const toolbarWidth = 70;
export const defaultPoint = {
  x: 0,
  y: 0,
};
export const defaultDimensions = {
  start: {
    ...defaultPoint
  },
  current: {
    ...defaultPoint
  },
};
export const defaultShapeType = ShapeType.LINE;
export const defaultShape = {
  id: '',
  dimensions: {
    ...defaultDimensions
  },
  shapeType: defaultShapeType,
};
export const midPointSize = 10;
export const cornerPointOffset = -5;