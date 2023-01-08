import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSafeState } from '../useSafeState';
import { useSyncedRef } from '../useSyncedRef';

export function useFunctionalState<S>(
  initialState: S | (() => S)
): [() => S, Dispatch<SetStateAction<S>>];
export function useFunctionalState<S = undefined>(): [
  () => S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

/**
 * Like `useState` but instead of raw state, state getter returned. `useSafeState` is
 * used underneath.
 */
export function useFunctionalState<S>(
  initialState?: S | (() => S)
): [() => S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useSafeState(initialState);
  const stateRef = useSyncedRef(state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [useCallback(() => stateRef.current, []), setState];
}
