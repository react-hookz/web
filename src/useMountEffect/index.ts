import {useEffect} from 'react';

/**
 * Run effect only when component is first mounted.
 *
 * @param effect Effector to run on mount
 */
export function useMountEffect(effect: CallableFunction): void {
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		effect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
