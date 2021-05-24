/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { defaultDimensions } from '../constants/constants';
import { IShape, ShapeType } from '../models/shape';
import { EventListenerContext } from '../providers/EventListenerProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShape, selectSelectedShapeType, selectShapes } from '../redux/selectors';
import { addShape, deselectShape } from '../redux/slice';
import Line from './Line';
import Rectangle from './Rectangle';

const PlaygroundContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const Playground: FC = () => {
  const selectedShapeType = useAppSelector(selectSelectedShapeType);
  const shapes = useAppSelector(selectShapes);
  const selectedShape = useAppSelector(selectSelectedShape);
  const dispatch = useAppDispatch();
  const eventListenerContext = useContext(EventListenerContext);
  const [shape, setShape] = useState<IShape>({
    id: '',
    dimensions: defaultDimensions,
    selected: false,
    shapeType: selectedShapeType,
  });

  useEffect(
    () => {
      if (selectedShape) {
        setShape(selectedShape);
      } else {
        setShape({
          id: '',
          dimensions: defaultDimensions,
          selected: false,
          shapeType: selectedShapeType,
        });
      }
    },
    [selectedShape]
  );

  useEffect(
    () => {
      if (shape && !shape.id) {
        setShape({ ...shape, shapeType: selectedShapeType });
      }
    },
    [selectedShapeType]
  );


  const outline = (): JSX.Element => {
    switch (shape.shapeType) {
      case ShapeType.LINE:
        return <Line id={shape.id} start={shape.dimensions.start} current={shape.dimensions.current} selected={shape.selected} creating />;
      case ShapeType.RECTANGLE:
        return <Rectangle id={shape.id} start={shape.dimensions.start} current={shape.dimensions.current} selected={shape.selected} creating />;
      default:
        return <div />;
    }
  };

  const onMove = useCallback(
    (event: MouseEvent) => {
      setShape(s => ({ ...s, dimensions: { ...s.dimensions, current: { x: event.x, y: event.y } } }));
    },
    [setShape]
  );

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedShape) return;
    setShape(s => ({ ...s, id: shortid.generate(), dimensions: { start: { x: event.clientX, y: event.clientY }, current: { x: event.clientX, y: event.clientY } } }));
    eventListenerContext.toggleEventListener(onMove, true);
  };

  const mouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedShape) return;
    eventListenerContext.toggleEventListener(onMove, false);
    const shp = { ...shape };
    dispatch(addShape(shp));
    setShape({
      id: '',
      dimensions: defaultDimensions,
      selected: false,
      shapeType: selectedShapeType,
    });
  };

  const click = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(deselectShape(shape));
  };

  return (
    <PlaygroundContainer onClick={click} onMouseDown={mouseDown} onMouseUp={mouseUp}>
      {shapes.map(s => s.shapeType === ShapeType.LINE ?
        <Line key={s.id} id={s.id} start={s.dimensions.start} current={s.dimensions.current} selected={s.selected} /> :
        <Rectangle key={s.id} id={s.id} start={s.dimensions.start} current={s.dimensions.current} selected={s.selected} />)}
      {!!shape.id && outline()}
    </PlaygroundContainer>
  );
};

export default Playground;