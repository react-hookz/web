import { type BaseSyntheticEvent, useCallback, useState } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { type InitialState, type NextState, resolveHookState } from '../util/resolveHookState.js';

export function useToggle(
	initialState: InitialState<boolean>,
	ignoreReactEvents: false
): [boolean, (nextState?: NextState<boolean>) => void];
export function useToggle(
	initialState?: InitialState<boolean>,
	ignoreReactEvents?: true
): [boolean, (nextState?: NextState<boolean> | BaseSyntheticEvent) => void];

/**
 * Like `useState`, but can only become `true` or `false`.
 *
 * State setter, in case called without arguments, will change the state to opposite. React
 * synthetic events are ignored by default so state setter can be used as event handler directly,
 * such behaviour can be changed by setting 2nd parameter to `false`.
 */
export function useToggle(
	initialState: InitialState<boolean> = false,
	ignoreReactEvents = true
): [boolean, (nextState?: NextState<boolean> | BaseSyntheticEvent) => void] {
	// We don't use useReducer (which would end up with less code), because exposed
	// action does not provide functional updates feature.
	// Therefore, we have to create and expose our own state setter with
	// toggle logic.
	const [state, setState] = useState(initialState);
	const ignoreReactEventsRef = useSyncedRef(ignoreReactEvents);

	return [
		state,
		useCallback((nextState) => {
			setState((previousState) => {
				if (
					nextState === undefined ||
					(ignoreReactEventsRef.current &&
						typeof nextState === 'object' &&
						(nextState.constructor.name === 'SyntheticBaseEvent' ||
							// @ts-expect-error React internals
							typeof nextState._reactName === 'string'))
				) {
					return !previousState;
				}

				return Boolean(resolveHookState(nextState, previousState));
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	];
}
