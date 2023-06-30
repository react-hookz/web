import { useCallback, useState } from 'react';

const stateChanger = (state: number) => (state + 1) % Number.MAX_SAFE_INTEGER;

/**
 * Return callback function that re-renders component.
 */
export function useRerender(): () => void {
	// eslint-disable-next-line react/hook-use-state
	const [, setState] = useState(0);

	return useCallback(() => {
		setState(stateChanger);
	}, []);
}
