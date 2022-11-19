import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useIsMounted } from '../useIsMounted/useIsMounted';

export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

/**
 * Like `useState` but its state setter is guarded against setting the state of an unmounted component.
 */
export function useSafeState<S>(
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const isMounted = useIsMounted(true);

  return [
    state,
    useCallback((value) => {
      if (isMounted()) setState(value as S);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) as Dispatch<SetStateAction<S>>,
  ];
}
