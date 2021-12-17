import { useCallback, Dispatch, SetStateAction } from 'react';
import { IInitialState } from '../util/resolveHookState';
import { useSafeState, useSyncedRef } from '../index';

export function useGetSet<S>(
  initialState: IInitialState<S>
): [get: () => S, set: Dispatch<SetStateAction<S>>] {
  const [state, setState] = useSafeState(initialState);
  const stateRef = useSyncedRef(state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [useCallback(() => stateRef.current, []), setState];
}
