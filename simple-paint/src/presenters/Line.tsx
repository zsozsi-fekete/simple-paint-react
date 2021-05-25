import styled from 'styled-components';
import { toolbarWidth, lineHeight } from '../constants/constants';
import { IShapeProps, Shape } from './Shape';

export interface ILineProps extends IShapeProps {
  deg: number;
  width: number;
}

export const Line = styled(Shape).attrs<ILineProps>(({ start, width, deg, selected, creating }) => ({
  style: {
    top: `${start.y}px`,
    left: `${start.x - toolbarWidth}px`,
    width: `${width}px`,
    height: `${(selected || creating) ? 0 : lineHeight}px`,
    transform: `rotate(${deg}deg)`,
    borderLeft: `${(selected || creating) && 'none'}`,
    borderRight: `${(selected || creating) && 'none'}`,
  }
})) <ILineProps>`
  transform-origin: top left;
`;