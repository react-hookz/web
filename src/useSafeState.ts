import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

/**
 * Like `useState` but its state setter is guarded against sets on unmounted component.
 *
 * @param initialState
 */
export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];
export function useSafeState<S>(initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, _setState] = useState(initialState);
  const isMounted = useIsMounted();

  return [
    state,
    useCallback((value) => {
      if (isMounted()) _setState(value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) as Dispatch<SetStateAction<S>>,
  ];
}
