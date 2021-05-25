import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteShape } from '../redux/slice';

export const useShapeDelete = (selected: boolean | undefined, creating: boolean | undefined): void => {
  const dispatch = useAppDispatch();

  const onKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (!selected) return;
      if (ev.key === 'Delete') dispatch(deleteShape());
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