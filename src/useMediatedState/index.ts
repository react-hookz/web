import type {Dispatch} from 'react';
import {useCallback, useState} from 'react';
import {useSyncedRef} from '../useSyncedRef/index.js';
import type {InitialState, NextState} from '../util/resolve-hook-state.js';
import {resolveHookState} from '../util/resolve-hook-state.js';

export function useMediatedState<State = undefined>(): [State | undefined, Dispatch<NextState<State | undefined>>];
export function useMediatedState<State>(initialState: InitialState<State>): [State, Dispatch<NextState<State>>];
export function useMediatedState<State, RawState = State>(
	initialState: InitialState<State>,
	mediator?: (state: RawState) => State,
): [State, Dispatch<NextState<RawState, State>>];

/**
 * Like `useState`, but every value set is passed through a mediator function.
 */
export function useMediatedState<State, RawState = State>(
	initialState?: InitialState<State>,
	mediator?: (state: RawState | State | undefined) => State,
): [State | undefined, Dispatch<NextState<RawState, State | undefined>>] {
	const [state, setState] = useState(() => (mediator ? mediator(resolveHookState(initialState)) : initialState));
	const mediatorRef = useSyncedRef(mediator);

	return [
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		state as State,
		useCallback((value) => {
			if (mediatorRef.current) {
				setState((previousState) =>
					// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
					mediatorRef.current?.(resolveHookState<RawState, State | undefined>(value, previousState as State)),
				);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
				setState(value as unknown as State);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	];
}
