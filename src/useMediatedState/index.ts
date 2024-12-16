import { type Dispatch, useCallback, useState } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { type InitialState, type NextState, resolveHookState } from '../util/resolveHookState.js';

export function useMediatedState<State = undefined>(): [
	State | undefined,
	Dispatch<NextState<State | undefined>>,
];
export function useMediatedState<State>(
	initialState: InitialState<State>
): [State, Dispatch<NextState<State>>];
export function useMediatedState<State, RawState = State>(
	initialState: InitialState<State>,
	mediator?: (state: RawState) => State
): [State, Dispatch<NextState<RawState, State>>];

/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState<State, RawState = State>(
	initialState?: InitialState<State>,
	mediator?: (state: RawState | State | undefined) => State
): [State | undefined, Dispatch<NextState<RawState, State | undefined>>] {
	const [state, setState] = useState(() => {
		return mediator ? mediator(resolveHookState(initialState)) : initialState;
	});
	const mediatorRef = useSyncedRef(mediator);

	return [
		state as State,
		useCallback((value) => {
			if (mediatorRef.current) {
				setState((previousState) =>
					mediatorRef.current?.(
						resolveHookState<RawState, State | undefined>(value, previousState as State)
					)
				);
			} else {
				setState(value as unknown as State);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	];
}
