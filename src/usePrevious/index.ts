import {useEffect, useRef} from 'react';

/**
 * Returns the value passed to the hook on previous render.
 *
 * Yields `undefined` on first render.
 *
 * @param value Value to yield on next render
 */
export function usePrevious<T>(value?: T): T | undefined {
	const previous = useRef<T>();

	useEffect(() => {
		previous.current = value;
	});

	return previous.current;
}
