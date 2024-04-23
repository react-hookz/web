import { useCallback, useMemo, useRef } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { useUnmountEffect } from '../useUnmountEffect/index.js';
import { isBrowser } from '../util/const.js';

/**
 * Makes passed function to be called within next animation frame.
 *
 * Consequential calls, before the animation frame occurred, cancel previously scheduled call.
 *
 * @param cb Callback to fire within animation frame.
 */

export function useRafCallback<T extends (...args: any[]) => any>(
	cb: T
): [(...args: Parameters<T>) => void, () => void] {
	const cbRef = useSyncedRef(cb);
	const frame = useRef<number>(0);

	const cancel = useCallback(() => {
		if (!isBrowser) return;

		if (frame.current) {
			cancelAnimationFrame(frame.current);
			frame.current = 0;
		}
	}, []);

	useUnmountEffect(cancel);

	return [
		useMemo(() => {
			const wrapped = (...args: Parameters<T>) => {
				if (!isBrowser) return;

				cancel();

				frame.current = requestAnimationFrame(() => {
					cbRef.current(...args);
					frame.current = 0;
				});
			};

			Object.defineProperties(wrapped, {
				length: { value: cb.length },
				name: { value: `${cb.name || 'anonymous'}__raf` },
			});

			return wrapped;
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),

		cancel,
	];
}
