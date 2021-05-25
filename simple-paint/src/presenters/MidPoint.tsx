import styled from 'styled-components';
import { midPointSize } from '../constants/constants';

export const MidPoint = styled.div`
  height: ${midPointSize}px;
  width: ${midPointSize}px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: grab;
`;