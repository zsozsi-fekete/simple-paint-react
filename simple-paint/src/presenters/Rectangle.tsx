import styled from 'styled-components';
import { toolbarWidth } from '../constants/constants';
import { IShapeProps, Shape } from './Shape';

export interface IRectangleProps extends IShapeProps {
  height: number;
  width: number;
}

export const Rectangle = styled(Shape).attrs<IRectangleProps>(({ start, current, height, width }) => ({
  style: {
    height: `${height}px`,
    width: `${width}px`,
    top: `${current.y - start.y < 0 ? current.y : start.y}px`,
    left: `${(current.x - start.x < 0 ? current.x : start.x) - toolbarWidth}px`,
  }
})) <IRectangleProps>`
`;