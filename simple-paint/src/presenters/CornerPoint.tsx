import styled from 'styled-components';
import { cornerPointOffset, midPointSize } from '../constants/constants';

export enum Direction {
  TOP_RIGHT = 'Top Right',
  TOP_LEFT = 'Top Left',
  BOTTOM_RIGHT = 'Bottom Right',
  BOTTOM_LEFT = 'Bottom Left',
}

const getCursor = (dir: Direction): string => {
  switch (dir) {
    case Direction.TOP_LEFT:
      return 'nw-resize';
    case Direction.TOP_RIGHT:
      return 'ne-resize';
    case Direction.BOTTOM_LEFT:
      return 'sw-resize';
    case Direction.BOTTOM_RIGHT:
      return 'se-resize';
    default:
      return 'grab';
  }
};

export const CornerPoint = styled.div.attrs<{ direction: Direction }>(({ direction }) => ({
  style: {
    cursor: getCursor(direction),
  },
})) <{ direction: Direction }>`
  position: absolute;
  height: ${midPointSize}px;
  width: ${midPointSize}px;
  background-color: #bbb;
  ${({ direction }) =>
    direction === Direction.TOP_LEFT && `top: ${cornerPointOffset}px; left: ${cornerPointOffset}px;` ||
    direction === Direction.TOP_RIGHT && `top: ${cornerPointOffset}px; right: ${cornerPointOffset}px;` ||
    direction === Direction.BOTTOM_LEFT && `bottom: ${cornerPointOffset}px; left: ${cornerPointOffset}px;` ||
    direction === Direction.BOTTOM_RIGHT && `bottom: ${cornerPointOffset}px; right: ${cornerPointOffset}px;`
  }
`;