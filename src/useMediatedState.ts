import { useCallback, useRef } from 'react';
import { resolveHookState } from './util/resolveHookState';
import { useSafeState } from './useSafeState';

/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState<S>(
  initialState?: S | (() => S)
): [S, (value: S | (() => S)) => void];
export function useMediatedState<S, R>(
  initialState?: S | (() => S),
  mediator?: (state: R) => S
): [S, (value: R | ((prevState: S) => S)) => void];
export function useMediatedState<S, R>(
  initialState?: S | (() => S),
  mediator?: (state: R) => S
): [S, (value: R | ((prevState: S) => R)) => void] {
  const [state, setState] = useSafeState<S>(initialState);
  const mediatorRef = useRef(mediator);

  // this is required to make API stable
  mediatorRef.current = mediator;

  return [
    state,
    useCallback((value: R) => {
      if (mediator) {
        setState((prevState) =>
          mediatorRef.current(resolveHookState(value, (prevState as unknown) as R))
        );
      } else {
        setState((value as unknown) as S);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
