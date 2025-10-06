import type {Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import {useRafCallback} from '../useRafCallback/index.js';
import {useUnmountEffect} from '../useUnmountEffect/index.js';

export function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

/**
 * Like `React.useState`, but state is only updated within animation frame.
 */
export function useRafState<S>(initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S>>] {
	// eslint-disable-next-line react/hook-use-state
	const [state, innerSetState] = useState<S | undefined>(initialState);

	const [setState, cancelRaf] = useRafCallback(innerSetState);

	useUnmountEffect(cancelRaf);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return [state, setState as Dispatch<SetStateAction<S>>];
}
