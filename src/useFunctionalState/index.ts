import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSyncedRef } from '../useSyncedRef';

export function useFunctionalState<S>(
  initialState: S | (() => S)
): [() => S, Dispatch<SetStateAction<S>>];
export function useFunctionalState<S = undefined>(): [
  () => S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

/**
 * Like `useState` but instead of raw state, state getter returned.
 */
export function useFunctionalState<S>(
  initialState?: S | (() => S)
): [() => S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useState(initialState);
  const stateRef = useSyncedRef(state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [useCallback(() => stateRef.current, []), setState];
}
