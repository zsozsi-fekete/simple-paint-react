import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { defaultPoint } from '../constants/constants';
import { IPoint } from '../models/Point';
import { IShape } from '../models/shape';
import { EventListenerContext } from '../providers/EventListenerProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShape } from '../redux/selectors';
import { updateSelectedShape } from '../redux/slice';

export const useShapeDragging = (state: IShape, setShape: (value: React.SetStateAction<IShape>) => void):
  [
    dragging: boolean,
    dragDown: (event: React.MouseEvent<HTMLDivElement>) => void,
    dragUp: (event: React.MouseEvent<HTMLDivElement>) => void
  ] => {
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<IPoint>(defaultPoint);
  const selectedShape = useAppSelector(selectSelectedShape);
  const eventListenerContext = useContext(EventListenerContext);
  const dispatch = useAppDispatch();

  const startRef = useRef(start);
  const setStartRef = (st: IPoint): void => {
    startRef.current = st;
    setStart(st);
  };

  useEffect(
    () => {
      if (selectedShape) {
        setShape(selectedShape);
      }
    },
    [selectedShape]
  );

  const onDrag = useCallback(
    (event: MouseEvent) => {
      if (!selectedShape) return;
      const { x, y } = startRef.current;
      const offsetX = event.clientX - x;
      const offsetY = event.clientY - y;
      setShape(s => (
        {
          ...s,
          dimensions: {
            start: { x: selectedShape.dimensions.start.x + offsetX, y: selectedShape.dimensions.start.y + offsetY },
            current: { x: selectedShape.dimensions.current.x + offsetX, y: selectedShape.dimensions.current.y + offsetY }
          }
        }));
    },
    [selectedShape, startRef]
  );

  const dragDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (dragging) return;

    setDragging(true);
    setStartRef({ x: event.clientX, y: event.clientY });
    eventListenerContext.toggleEventListener(onDrag, true);
  };

  const dragUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!dragging) return;

    dispatch(updateSelectedShape(state));
    setDragging(false);
    eventListenerContext.toggleEventListener(onDrag, false);
  };

  return [dragging, dragDown, dragUp];
};
