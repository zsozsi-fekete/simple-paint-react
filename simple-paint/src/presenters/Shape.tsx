import styled from 'styled-components';
import { IDimensions } from '../models/shape';

export interface IShapeProps extends IDimensions {
  id: string;
  creating?: boolean;
  selected: boolean;
}

export const Shape = styled.div.attrs<IShapeProps>(props => ({
  style: {
    border: `${props.selected ? '3px dashed #c8d6e5' : '1px solid #341f97'}`,
    backgroundColor: `${props.selected ? '' : '#5f27cd'}`,
  }
})) <IShapeProps>`
  position: absolute;
  cursor: pointer;
`;