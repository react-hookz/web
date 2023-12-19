import { type SetStateAction, useCallback, useRef } from 'react';
import { useFirstMountState } from '#root/useFirstMountState/index.js';
import { useRerender } from '#root/useRerender/index.js';
import { resolveHookState } from '#root/util/resolveHookState.js';

export type ControlledRerenderDispatch<A> = (value: A, rerender?: boolean) => void;

export function useControlledRerenderState<S>(
	initialState: S | (() => S)
): [S, ControlledRerenderDispatch<SetStateAction<S>>];
export function useControlledRerenderState<S = undefined>(): [
	S | undefined,
	ControlledRerenderDispatch<SetStateAction<S | undefined>>,
];

/**
 * Like `React.useState`, but its state setter accepts extra argument, that allows to cancel
 * rerender.
 */
export function useControlledRerenderState<S>(
	initialState?: S | (() => S)
): [S | undefined, ControlledRerenderDispatch<SetStateAction<S | undefined>>] {
	const state = useRef<S | undefined>(
		useFirstMountState() ? resolveHookState(initialState) : undefined
	);
	const rr = useRerender();

	return [
		state.current,
		useCallback((value, rerender) => {
			const newState = resolveHookState(value, state.current);

			if (newState !== state.current) {
				state.current = newState;

				if (rerender === undefined || rerender) {
					rr();
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	];
}
