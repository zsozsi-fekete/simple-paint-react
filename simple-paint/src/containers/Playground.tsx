/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { defaultShape } from '../constants/constants';
import { Point } from '../models/Point';
import { IShape, ShapeType } from '../models/shape';
import { EventListenerContext } from '../providers/EventListenerProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShape, selectSelectedShapeType, selectShapes } from '../redux/selectors';
import { addShape, deselectShape } from '../redux/slice';
import ShapeContainer from './ShapeContainer';

const PlaygroundContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  cursor: crosshair;
`;

const Playground: FC = () => {
  const selectedShapeType = useAppSelector(selectSelectedShapeType);
  const shapes = useAppSelector(selectShapes);
  const selectedShape = useAppSelector(selectSelectedShape);
  const dispatch = useAppDispatch();
  const eventListenerContext = useContext(EventListenerContext);
  const [shape, setShape] = useState<IShape>(defaultShape);
  const [creating, setCreating] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(
    () => {
      if (selectedShape) {
        setShape(selectedShape);
      }
    },
    [selectedShape]
  );

  const onMove = useCallback(
    (event: MouseEvent) => {
      setShape(s => ({ ...s, dimensions: { ...s.dimensions, current: { x: event.x, y: event.y } } }));
    },
    [setShape]
  );

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedShape) return;
    setCreating(true);
    setShape(s => ({ id: shortid.generate(), dimensions: { start: { x: event.clientX, y: event.clientY }, current: { x: event.clientX, y: event.clientY } }, shapeType: selectedShapeType }));
    eventListenerContext.toggleEventListener(onMove, true);
  };

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedShape) return;
    eventListenerContext.toggleEventListener(onMove, false);
    dispatch(addShape(shape));
    setCreating(false);
    setShape(defaultShape);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedShape) {
      dispatch(deselectShape(shape));
      setShape(defaultShape);
    }
  };

  const onDrag = useCallback(
    (event: MouseEvent) => {
      if (!selectedShape) return;
      const { x, y } = Point.getMidPoint(selectedShape.dimensions.start, selectedShape.dimensions.current);
      const offsetX = event.clientX - x;
      const offsetY = event.clientY - y;
      setShape(s => ({ ...s, dimensions: { start: { x: selectedShape.dimensions.start.x + offsetX, y: selectedShape.dimensions.start.y + offsetY }, current: { x: selectedShape.dimensions.current.x + offsetX, y: selectedShape.dimensions.current.y + offsetY } } }));
    },
    [selectedShape]
  );

  const mouseDown = () => {
    setDragging(true);
    eventListenerContext.toggleEventListener(onDrag, true);
  };

  const mouseUp = () => {
    setDragging(false);
    eventListenerContext.toggleEventListener(onDrag, false);
  };

  const outline = useCallback(
    (): JSX.Element => <ShapeContainer id={shape.id} shapeType={shape.shapeType} start={shape.dimensions.start} current={shape.dimensions.current} selected={!!shape.id} creating={creating} dragging={dragging} mouseDown={mouseDown} mouseUp={mouseUp} />,
    [shape]
  );

  return (
    <PlaygroundContainer onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {shapes.map(s =>
        <ShapeContainer key={s.id} id={s.id} shapeType={s.shapeType} start={s.dimensions.start} current={s.dimensions.current} mouseDown={mouseDown} mouseUp={mouseUp} />
      )}
      {!!shape.id && outline()}
    </PlaygroundContainer>
  );
};

export default Playground;