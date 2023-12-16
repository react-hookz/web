import { type RefObject, useEffect, useMemo } from 'react';
import { useIsMounted } from '#root/useIsMounted/index.js';
import { useSyncedRef } from '#root/useSyncedRef/index.js';
import { hasOwnProperty, off, on } from '#root/util/misc.js';

/**
 *  An HTML element or ref object containing an HTML element.
 *
 * @param target An HTML element or ref object containing an HTML element.
 * @param params Parameters specific to the target element's `addEventListener` method. Commonly
 * something like `[eventName, listener, options]`.
 */
export function useEventListener<T extends EventTarget>(
	target: RefObject<T> | T | null,
	...params:
		| Parameters<T['addEventListener']>
		| [string, EventListenerOrEventListenerObject | ((...args: any[]) => any), ...any]
): void {
	const isMounted = useIsMounted();

	// Create static event listener
	const listenerRef = useSyncedRef(params[1]);
	const eventListener = useMemo<EventListener>(
		() =>
			// As some event listeners designed to be used through `this`
			// it is better to make listener a conventional function as it
			// infers call context

			function (this: T, ...args) {
				// Normally, such situation should not happen, but better to
				// have back covered
				/* istanbul ignore next */
				if (!isMounted()) return;

				// We dont care if non-listener provided, simply dont do anything
				/* istanbul ignore else */
				if (typeof listenerRef.current === 'function') {
					listenerRef.current.apply(this, args);
				} else if (typeof listenerRef.current!.handleEvent === 'function') {
					listenerRef.current!.handleEvent.apply(this, args);
				}
			},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		const tgt = isRefObject(target) ? target.current : target;
		if (!tgt) return;

		const restParams: unknown[] = params.slice(2);

		on(tgt, params[0], eventListener, ...restParams);

		return () => {
			off(tgt, params[0], eventListener, ...restParams);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, params[0]]);
}

function isRefObject<T>(target: RefObject<T> | T | null): target is RefObject<T> {
	return target !== null && typeof target === 'object' && hasOwnProperty(target, 'current');
}
