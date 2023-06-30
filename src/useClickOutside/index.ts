import { type MutableRefObject, type RefObject, useEffect } from 'react';
import { off, on } from '../util/misc';
import { useSyncedRef } from '../useSyncedRef';

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

		events.forEach((name) => {
			on(document, name, handler, { passive: true });
		});

		return () => {
			events.forEach((name) => {
				off(document, name, handler, { passive: true });
			});
		};
	}, [...events]);
}
