import { useEffect } from 'react';
import { useSyncedRef } from '#root/useSyncedRef/index.js';

/**
 * Run effect only when component is unmounted.
 *
 * @param effect Effector to run on unmount
 */
export function useUnmountEffect(effect: CallableFunction): void {
	const effectRef = useSyncedRef(effect);

	useEffect(
		() => () => {
			effectRef.current();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
}
