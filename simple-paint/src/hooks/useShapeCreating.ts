import { useCallback, useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { defaultShape } from '../constants/constants';
import { IShape } from '../models/shape';
import { EventListenerContext } from '../providers/EventListenerProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShape, selectSelectedShapeType } from '../redux/selectors';
import { addShape } from '../redux/slice';

export const useShapeCreating = (shape: IShape, setShape: (value: React.SetStateAction<IShape>) => void):
  [
    creating: boolean,
    createDown: (event: React.MouseEvent<HTMLDivElement>) => void,
    createUp: (event: React.MouseEvent<HTMLDivElement>) => void,
  ] => {
  const [creating, setCreating] = useState(false);
  const selectedShape = useAppSelector(selectSelectedShape);
  const selectedShapeType = useAppSelector(selectSelectedShapeType);
  const eventListenerContext = useContext(EventListenerContext);
  const dispatch = useAppDispatch();

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

  const createDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.button !== 0 || selectedShape || creating) return;

    setCreating(true);
    setShape(
      {
        id: shortid.generate(),
        dimensions: { start: { x: event.clientX, y: event.clientY }, current: { x: event.clientX, y: event.clientY } },
        shapeType: selectedShapeType
      }
    );
    eventListenerContext.toggleEventListener(onMove, true);
  };

  const createUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.button !== 0 || selectedShape || !creating) return;

    dispatch(addShape(shape));
    setCreating(false);
    setShape(defaultShape);
    eventListenerContext.toggleEventListener(onMove, false);
  };

  return [creating, createDown, createUp];
};
