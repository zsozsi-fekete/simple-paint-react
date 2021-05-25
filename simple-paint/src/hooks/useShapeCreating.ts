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
  const selectedShapeType = useAppSelector(selectSelectedShapeType);
  const eventListenerContext = useContext(EventListenerContext);
  const dispatch = useAppDispatch();
  const selectedShape = useAppSelector(selectSelectedShape);

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

    if (selectedShape || creating) return;
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

    if (selectedShape || !creating) return;
    eventListenerContext.toggleEventListener(onMove, false);
    dispatch(addShape(shape));
    setCreating(false);
    setShape(defaultShape);
  };

  return [creating, createDown, createUp];
};
