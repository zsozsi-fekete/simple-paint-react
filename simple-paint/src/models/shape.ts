import { IPoint } from './Point';

export enum ShapeType {
  LINE = 'Line',
  RECTANGLE = 'Rectangle',
  CIRCLE = 'Circle',
}

export interface IDimensions {
  start: IPoint;
  current: IPoint;
}

export interface IShape {
  id: string;
  dimensions: IDimensions;
  shapeType: ShapeType;
}