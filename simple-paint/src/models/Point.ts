export interface IPoint {
  x: number;
  y: number;
}

export class Point implements IPoint {
  constructor(public x: number, public y: number) { }

  getDistanceX = (x: number): number => this.getDistance(this.x, x);

  getDistanceY = (y: number): number => this.getDistance(this.y, y);

  private getDistance = (start: number, end: number): number => Math.abs(start - end);

  getRotation = (point: IPoint): number => {
    const { x, y } = this.getUnitDirectionalVector(point);
    return Math.round(Math.atan2(y, x) * 180 / Math.PI);
  }

  private getUnitDirectionalVector = (point: IPoint): IPoint => {
    const magnitude = this.getMagnitude(point);
    const { x, y } = this.getDirectionalVector(point);
    return ({ x: x / magnitude, y: y / magnitude });
  }

  private getDirectionalVector = (point: IPoint): IPoint => ({ x: point.x - this.x, y: point.y - this.y });

  getMagnitude = (point: IPoint): number => Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
}