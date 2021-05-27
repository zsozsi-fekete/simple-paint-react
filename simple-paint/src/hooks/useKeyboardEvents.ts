import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteShape, clearSelectedShape } from '../redux/slice';

export const useKeyboardEvents = (selected: boolean | undefined, creating: boolean | undefined, dragging: boolean | undefined, resizing: boolean | undefined): void => {
  const dispatch = useAppDispatch();

  const onKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (!selected) return;
      if (ev.key === 'Delete') dispatch(deleteShape());
      if (ev.key === 'Escape') dispatch(clearSelectedShape());
    },
    [dispatch, selected]
  );

  useEffect(
    () => {
      if (selected && !creating && !dragging && !resizing) document.addEventListener('keydown', onKeyPress);
      return () => {
        document.removeEventListener('keydown', onKeyPress);
      };
    },
    [selected, creating, dragging, resizing]
  );
};