import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deselectShape } from '../redux/slice';

export const useShapeDeselect = (selected: boolean | undefined, creating: boolean | undefined, dragging: boolean | undefined, resizing: boolean | undefined): void => {
  const dispatch = useAppDispatch();

  const rightClick = useCallback(
    (ev: MouseEvent) => {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      if (!selected) return;
      dispatch(deselectShape());
    },
    [dispatch, selected]
  );

  useEffect(
    () => {
      if (selected && !creating && !dragging && !resizing) document.addEventListener('contextmenu', rightClick);
      return () => {
        document.removeEventListener('contextmenu', rightClick);
      };
    },
    [selected, creating, dragging, resizing]
  );
};