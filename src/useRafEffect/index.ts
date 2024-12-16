import { type DependencyList, useEffect } from 'react';
import { useRafCallback } from '../useRafCallback/index.js';

/**
 * Like `React.useEffect`, but state is only updated within animation frame.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`.
 */
export function useRafEffect(callback: (...args: any[]) => void, deps: DependencyList): void {
	const [rafCallback, cancelRaf] = useRafCallback(callback);

	useEffect(
		() => {
			rafCallback();

			return cancelRaf;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps
	);
}
