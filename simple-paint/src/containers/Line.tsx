import { FC } from 'react';
import styled from 'styled-components';
import { lineHeight, toolbarWidth } from '../constants/constants';
import { Point } from '../models/Point';
import { IShapeProps, Shape } from '../presenters/Shape';
import { useAppDispatch } from '../redux/hooks';
import { selectShape } from '../redux/slice';

export interface ILineProps extends IShapeProps {
  deg: number;
  width: number;
}

const LineShape = styled(Shape).attrs<ILineProps>(({ start, width, deg, selected, creating }) => ({
  style: {
    top: `${start.y}px`,
    left: `${start.x - toolbarWidth}px`,
    width: `${width}px`,
    height: `${lineHeight}px`,
    transform: `rotate(${deg}deg)`,
    border: `${!creating && '1px solid #2e86de'}`,
    borderTop: `${(selected || creating) && '3px dashed #c8d6e5'}`,
    backgroundColor: `${creating ? '' : '#54a0ff'}`,
  }
})) <ILineProps>`
  transform-origin: top left;
`;

const Line: FC<IShapeProps> = (props) => {
  const { id, start, current, selected, creating } = props;
  const dispatch = useAppDispatch();
  const point = new Point(start.x, start.y);
  const deg = point.getRotation(current);
  const width = point.getMagnitude(current);

  const click = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!selected) dispatch(selectShape(id));
  };

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!creating) {
      event.stopPropagation();
    }
  };


  return (
    <LineShape
      id={id}
      start={start}
      current={current}
      deg={deg}
      width={width}
      selected={selected}
      creating={creating}
      onClick={click}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    />
  );
};

export default Line;