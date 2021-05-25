import { useCallback, useContext, useRef, useState } from 'react';
import { IShape } from '../models/shape';
import { Direction } from '../presenters/CornerPoint';
import { EventListenerContext } from '../providers/EventListenerProvider';
import { useAppDispatch } from '../redux/hooks';
import { updateSelectedShape } from '../redux/slice';

export const useShapeResizing = (shape: IShape, setShape: (value: React.SetStateAction<IShape>) => void):
  [
    resizing: boolean,
    resizeDown: (event: React.MouseEvent<HTMLDivElement>, dir: Direction) => void,
    resizeUp: (event: React.MouseEvent<HTMLDivElement>) => void,
  ] => {
  const [resizing, setResizing] = useState(false);
  const [direction, setDirection] = useState<Direction>(Direction.TOP_LEFT);
  const eventListenerContext = useContext(EventListenerContext);
  const dispatch = useAppDispatch();

  const directionRef = useRef(direction);
  const setDirectionRef = (dir: Direction): void => {
    directionRef.current = dir;
    setDirection(dir);
  };

  const onResize = useCallback(
    (event: MouseEvent) => {
      switch (directionRef.current) {
        case Direction.TOP_LEFT:
          setShape(s => ({ ...s, dimensions: { ...s.dimensions, start: { x: event.x, y: event.y } } }));
          break;
        case Direction.TOP_RIGHT:
          setShape(s => ({ ...s, dimensions: { start: { ...s.dimensions.start, y: event.y }, current: { ...s.dimensions.current, x: event.x } } }));
          break;
        case Direction.BOTTOM_LEFT:
          setShape(s => ({ ...s, dimensions: { start: { ...s.dimensions.start, x: event.x }, current: { ...s.dimensions.current, y: event.y } } }));
          break;
        case Direction.BOTTOM_RIGHT:
          setShape(s => ({ ...s, dimensions: { ...s.dimensions, current: { x: event.x, y: event.y } } }));
          break;
        default:
          break;
      }
    },
    [setShape, directionRef]
  );

  const resizeDown = (event: React.MouseEvent<HTMLDivElement>, dir: Direction) => {
    event.stopPropagation();
    if (resizing) return;

    setResizing(true);
    setDirectionRef(dir);
    eventListenerContext.toggleEventListener(onResize, true);
  };

  const resizeUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!resizing) return;

    setResizing(false);
    dispatch(updateSelectedShape(shape));
    eventListenerContext.toggleEventListener(onResize, false);
  };

  return [resizing, resizeDown, resizeUp];
};
