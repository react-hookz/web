import { type DependencyList, type EffectCallback, useEffect } from 'react';
import { useFirstMountState } from '#root/useFirstMountState/index.js';
import { noop } from '#root/util/const.js';

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
