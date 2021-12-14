import { useRef, useCallback } from 'react';
import { IInitialState, INextState, resolveHookState } from '../util/resolveHookState';
import { useRerender } from '../index';

export function useGetSet<S>(
  initialState: IInitialState<S>
): [get: () => S, set: (nextState: INextState<S>) => void] {
  const rerender = useRerender();
  const ref = useRef<S>(resolveHookState(initialState));
  const get = useCallback(() => ref.current, []);
  const set = useCallback(
    (nextState: INextState<S>) => {
      ref.current = resolveHookState(nextState, ref.current);
      rerender();
    },
    [rerender]
  );
  return [get, set];
}
