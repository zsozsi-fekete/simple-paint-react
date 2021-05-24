import { FC } from 'react';
import styled from 'styled-components';
import { toolbarWidth } from '../constants/constants';
import { Point } from '../models/Point';
import { IShapeProps, Shape } from '../presenters/Shape';
import { useAppDispatch } from '../redux/hooks';
import { selectShape } from '../redux/slice';

export interface IRectangleProps extends IShapeProps {
  height: number;
  width: number;
}

const RectShape = styled(Shape).attrs<IRectangleProps>(({ start, current, height, width, selected, creating }) => ({
  style: {
    height: `${height}px`,
    width: `${width}px`,
    top: `${current.y - start.y < 0 ? current.y : start.y}px`,
    left: `${(current.x - start.x < 0 ? current.x : start.x) - toolbarWidth}px`,
    border: `${(selected || creating) ? '3px dashed #c8d6e5' : '1px solid #341f97'}`,
    backgroundColor: `${creating ? '' : '#5f27cd'}`,
  }
})) <IRectangleProps>``;

const Rectangle: FC<IShapeProps> = (props) => {
  const { id, start, current, selected, creating } = props;
  const dispatch = useAppDispatch();

  const point = new Point(start.x, start.y);

  const click = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!selected) dispatch(selectShape(id));
  };

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!creating || selected) {
      event.stopPropagation();
    }
  };

  return (
    <RectShape
      id={id}
      start={start}
      current={current}
      width={point.getDistanceX(current.x)}
      height={point.getDistanceY(current.y)}
      selected={selected}
      creating={creating}
      onClick={click}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    />
  );
};

export default Rectangle;