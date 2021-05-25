import React, { FC } from 'react';
import { Point } from '../models/Point';
import { IDimensions, ShapeType } from '../models/shape';
import { Line } from '../presenters/Line';
import { MidPoint } from '../presenters/MidPoint';
import { Rectangle } from '../presenters/Rectangle';
import { useAppDispatch } from '../redux/hooks';
import { selectShape } from '../redux/slice';


export interface IShapeContainerProps extends IDimensions {
  id: string;
  shapeType: ShapeType;
  creating?: boolean;
  selected?: boolean;
  dragging?: boolean;
  mouseDown: () => void;
  mouseUp: () => void;
}

const ShapeContainer: FC<IShapeContainerProps> = (props) => {
  const { id, shapeType, start, current, selected, creating, dragging, mouseDown, mouseUp } = props;
  const dispatch = useAppDispatch();
  const point = new Point(start.x, start.y);

  const click = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!selected) dispatch(selectShape(id));
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!creating) event.stopPropagation();
  };

  const onDragDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    mouseDown();
  };

  const onDragUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    mouseUp();
  };

  const children = !creating && selected && <MidPoint
    onMouseDown={onDragDown}
    onMouseUp={onDragUp}
  />;

  return (
    {
      [ShapeType.LINE]:
        <Line
          id={id}
          start={start}
          current={current}
          deg={point.getRotation(current)}
          width={point.getMagnitude(current)}
          selected={selected}
          creating={creating}
          dragging={dragging}
          onClick={click}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {children}
        </Line>,
      [ShapeType.RECTANGLE]:
        <Rectangle
          id={id}
          start={start}
          current={current}
          width={point.getDistanceX(current.x)}
          height={point.getDistanceY(current.y)}
          selected={selected}
          creating={creating}
          dragging={dragging}
          onClick={click}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {children}
        </Rectangle>,
    }[shapeType]
  );
};

export default ShapeContainer;

