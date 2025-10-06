import type {DependencyList, EffectCallback} from 'react';
import {useEffect} from 'react';
import {useFirstMountState} from '../useFirstMountState/index.js';
import {noop} from '../util/const.js';

/**
 * Effect hook that ignores the first render (not invoked on mount).
 *
 * @param effect Effector to run on updates
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
	const isFirstMount = useFirstMountState();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(isFirstMount ? noop : effect, deps);
}
