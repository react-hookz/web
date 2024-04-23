import { type MutableRefObject, type RefObject, useEffect } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { off, on } from '../util/misc.js';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * Triggers a callback when the user clicks outside a target element.
 *
 * @param ref React ref object containing the target HTML element.
 * @param callback Callback invoked when the user clicks outside the target element.
 * @param events List of events that will be used as triggers for the outside click. Default:
 * 'mousedown', 'touchstart'
 */
export function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T> | MutableRefObject<T>,
	callback: EventListener,
	events: string[] = DEFAULT_EVENTS
): void {
	const cbRef = useSyncedRef(callback);
	const refRef = useSyncedRef(ref);

	useEffect(() => {
		function handler(this: HTMLElement, event: Event) {
			if (!refRef.current.current) return;

			const { target: evtTarget } = event;
			const cb = cbRef.current;

			if (
				!evtTarget ||
				(Boolean(evtTarget) && !refRef.current.current.contains(evtTarget as Node))
			) {
				cb.call(this, event);
			}
		}

		for (const name of events) {
			on(document, name, handler, { passive: true });
		}

		return () => {
			for (const name of events) {
				off(document, name, handler, { passive: true });
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...events]);
}
