import React, { FC } from 'react';
import { useKeyboardEvents } from '../hooks/useKeyboardEvents';
import { useShapeDeselect } from '../hooks/useShapeDeselect';
import { useShapeDragging } from '../hooks/useShapeDragging';
import { useShapeResizing } from '../hooks/useShapeResizing';
import { Point } from '../models/Point';
import { IDimensions, IShape, ShapeType } from '../models/shape';
import { CornerPoint, Direction } from '../presenters/CornerPoint';
import { Line } from '../presenters/Line';
import { MidPoint } from '../presenters/MidPoint';
import { Rectangle } from '../presenters/Rectangle';
import { useAppDispatch } from '../redux/hooks';
import { clearSelectedShape, selectShape } from '../redux/slice';

export interface IShapeContainerProps extends IDimensions {
  id: string;
  shapeType: ShapeType;
  creating?: boolean;
  selected?: boolean;
  shape: IShape;
  setShape: (value: React.SetStateAction<IShape>) => void;
}

const ShapeContainer: FC<IShapeContainerProps> = (props) => {
  const { id, shapeType, start, current, selected, creating, shape, setShape } = props;
  const [dragging, dragDown, dragUp] = useShapeDragging(shape, setShape);
  const [resizing, resizeDown, resizeUp] = useShapeResizing(shape, setShape);
  useKeyboardEvents(selected, creating, dragging, resizing);
  useShapeDeselect(selected, creating, dragging, resizing);
  const dispatch = useAppDispatch();
  const point = new Point(start.x, start.y);

  const click = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!selected) dispatch(selectShape(id));
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (selected) dispatch(clearSelectedShape());
  };

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!creating) event.stopPropagation();
  };

  const children = !creating && selected && (
    <>
      <MidPoint
        onMouseDown={dragDown}
        onMouseUp={dragUp}
      />
      <CornerPoint direction={Direction.TOP_LEFT} onMouseDown={(event) => resizeDown(event, Direction.TOP_LEFT)} onMouseUp={resizeUp} />
      <CornerPoint direction={Direction.BOTTOM_RIGHT} onMouseDown={(event) => resizeDown(event, Direction.BOTTOM_RIGHT)} onMouseUp={resizeUp} />
      {shapeType === ShapeType.RECTANGLE &&
        <>
          <CornerPoint direction={Direction.TOP_RIGHT} onMouseDown={(event) => resizeDown(event, Direction.TOP_RIGHT)} onMouseUp={resizeUp} />
          <CornerPoint direction={Direction.BOTTOM_LEFT} onMouseDown={(event) => resizeDown(event, Direction.BOTTOM_LEFT)} onMouseUp={resizeUp} />
        </>
      }
    </>
  );

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

