import { Dispatch, useCallback, useRef } from 'react';
import { IInitialState, INextState, resolveHookState } from './util/resolveHookState';
import { useSafeState } from './useSafeState';

export function useMediatedState<State>(
  initialState?: IInitialState<State>
): [State, Dispatch<State>];
export function useMediatedState<State, RawState>(
  initialState: IInitialState<State>,
  mediator?: (state: RawState) => State
): [State, Dispatch<INextState<RawState, State>>];

/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState<State, RawState>(
  initialState?: IInitialState<State>,
  mediator?: (state: RawState | undefined) => State
): [State | undefined, Dispatch<INextState<RawState, State | undefined>>] {
  const [state, setState] = useSafeState(initialState);
  const mediatorRef = useRef(mediator);

  // this is required to make API stable
  mediatorRef.current = mediator;

  return [
    state,
    useCallback((value) => {
      const m = mediatorRef.current;

      if (m) {
        setState((prevState) => m(resolveHookState<RawState, State | undefined>(value, prevState)));
      } else {
        setState((value as unknown) as State);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
