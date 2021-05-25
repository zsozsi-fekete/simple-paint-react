import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deselectShape } from '../redux/slice';

export const useShapeDeselect = (selected: boolean | undefined, creating: boolean | undefined, resizing: boolean | undefined): void => {
  const dispatch = useAppDispatch();

  const rightClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();
      if (!selected || creating || resizing) return;
      dispatch(deselectShape());
    },
    [dispatch, selected, creating]
  );

  useEffect(
    () => {
      if (selected && !creating) document.addEventListener('contextmenu', rightClick);
      return () => {
        document.removeEventListener('contextmenu', rightClick);
      };
    },
    [selected, creating]
  );
};