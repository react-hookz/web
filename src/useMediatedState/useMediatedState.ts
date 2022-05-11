import { Dispatch, useCallback } from 'react';
import { useSafeState, useSyncedRef } from '..';
import { IInitialState, INextState, resolveHookState } from '../util/resolveHookState';

export function useMediatedState<State = undefined>(): [
  State | undefined,
  Dispatch<INextState<State | undefined>>
];
export function useMediatedState<State>(
  initialState: IInitialState<State>
): [State, Dispatch<INextState<State>>];
export function useMediatedState<State, RawState = State>(
  initialState: IInitialState<State>,
  mediator?: (state: RawState) => State
): [State, Dispatch<INextState<RawState, State>>];

/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState<State, RawState = State>(
  initialState?: IInitialState<State>,
  mediator?: (state: RawState | State | undefined) => State
): [State | undefined, Dispatch<INextState<RawState, State | undefined>>] {
  const [state, setState] = useSafeState(() => {
    return mediator ? mediator(resolveHookState(initialState)) : initialState;
  });
  const mediatorRef = useSyncedRef(mediator);

  return [
    state as State,
    useCallback((value) => {
      if (mediatorRef.current) {
        setState((prevState) =>
          mediatorRef.current?.(
            resolveHookState<RawState, State | undefined>(value, prevState as State)
          )
        );
      } else {
        setState(value as unknown as State);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
