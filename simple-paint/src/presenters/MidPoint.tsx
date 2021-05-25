import styled from 'styled-components';
import { dragButtonSize } from '../constants/constants';

export const MidPoint = styled.div`
  height: ${dragButtonSize}px;
  width: ${dragButtonSize}px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: grab;
`;