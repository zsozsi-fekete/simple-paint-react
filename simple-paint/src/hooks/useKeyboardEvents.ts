import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteShape, deselectShape } from '../redux/slice';

export const useKeyboardEvents = (selected: boolean | undefined, creating: boolean | undefined): void => {
  const dispatch = useAppDispatch();

  const onKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (!selected) return;
      if (ev.key === 'Delete') dispatch(deleteShape());
      if (ev.key === 'Escape') dispatch(deselectShape());
    },
    [dispatch, selected]
  );

  useEffect(
    () => {
      if (selected && !creating) document.addEventListener('keydown', onKeyPress);
      return () => {
        document.removeEventListener('keydown', onKeyPress);
      };
    },
    [selected, creating]
  );
};