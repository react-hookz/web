import { Dispatch, useCallback } from 'react';
import { IInitialState, INextState, resolveHookState } from '../util/resolveHookState';
import { useSafeState, useSyncedRef } from '..';

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
  const mediatorRef = useSyncedRef(mediator);

  return [
    state,
    useCallback((value) => {
      if (mediatorRef.current) {
        setState((prevState) =>
          mediatorRef.current?.(resolveHookState<RawState, State | undefined>(value, prevState))
        );
      } else {
        setState(value as unknown as State);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
