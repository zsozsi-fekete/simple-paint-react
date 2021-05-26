import styled from 'styled-components';
import { IDimensions } from '../models/shape';

export interface IShapeProps extends IDimensions {
  id: string;
  creating?: boolean;
  selected?: boolean;
  dragging?: boolean;
}

interface IShpPrps {
  border?: string;
  backgroundColor?: string,
}

export const Shape = styled.div.attrs<IShapeProps>(({ selected, creating }) => ({
  border: `${!creating && !selected ? '1px solid #10ac84' : '3px dashed #c8d6e5'}`,
  backgroundColor: `${!creating && !selected && '#1dd1a1'}`,
})) <IShpPrps>`
  border: ${props => props.border};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;