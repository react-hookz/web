import type {RefObject} from 'react';
import {useEffect} from 'react';
import {useSyncedRef} from '../useSyncedRef/index.js';
import {isBrowser} from '../util/const.js';

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

type ResizeObserverSingleton = {
	observer: ResizeObserver;
	subscribe: (target: Element, callback: UseResizeObserverCallback) => void;
	unsubscribe: (target: Element, callback: UseResizeObserverCallback) => void;
};

// One observer per box model: a ResizeObserver only notifies on changes of the
// box it was asked to observe, so boxes cannot share an instance.
const observerSingletons = new Map<ResizeObserverBoxOptions, ResizeObserverSingleton>();

function getResizeObserver(box: ResizeObserverBoxOptions): ResizeObserverSingleton | undefined {
	if (!isBrowser) {
		return undefined;
	}

	const observerSingleton = observerSingletons.get(box);

	if (observerSingleton) {
		return observerSingleton;
	}

	const callbacks = new Map<Element, Set<UseResizeObserverCallback>>();

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const cbs = callbacks.get(entry.target);
			if (cbs === undefined || cbs.size === 0) {
				continue;
			}

			for (const cb of cbs) {
				setTimeout(() => {
					cb(entry);
				}, 0);
			}
		}
	});

	const singleton: ResizeObserverSingleton = {
		observer,
		subscribe(target, callback) {
			let cbs = callbacks.get(target);

			if (!cbs) {
				// If target has no observers yet - register it
				cbs = new Set<UseResizeObserverCallback>();
				callbacks.set(target, cbs);
				observer.observe(target, {box});
			}

			// As Set is duplicate-safe - simply add callback on each call
			cbs.add(callback);
		},
		unsubscribe(target, callback) {
			const cbs = callbacks.get(target);

			// Else branch should never occur in case of normal execution
			// because callbacks map is hidden in closure - it is impossible to
			// simulate situation with non-existent `cbs` Set
			if (cbs) {
				// Remove current observer
				cbs.delete(callback);

				if (cbs.size === 0) {
					// If no observers left unregister target completely
					callbacks.delete(target);
					observer.unobserve(target);
				}
			}
		},
	};

	observerSingletons.set(box, singleton);

	return singleton;
}

/**
 * Invokes a callback whenever ResizeObserver detects a change to target's size.
 *
 * @param target React reference or Element to track.
 * @param callback Callback that will be invoked on resize.
 * @param enabled Whether resize observer is enabled or not.
 * @param box Box model whose changes trigger the callback. A `content-box` observer stays silent
 * when padding or border grow around an unchanged content box, and vice versa.
 */
export function useResizeObserver<T extends Element>(
	target: RefObject<T | null> | T | null,
	callback: UseResizeObserverCallback,
	enabled = true,
	box: ResizeObserverBoxOptions = 'content-box',
): void {
	const ro = enabled && getResizeObserver(box);
	const cb = useSyncedRef(callback);

	const tgt = target && 'current' in target ? target.current : target;

	useEffect(() => {
		// This secondary target resolve required for case when we receive ref object, which, most
		// likely, contains null during render stage, but already populated with element during
		// effect stage.

		const element = target && 'current' in target ? target.current : target;

		if (ro === false || ro === undefined || element === null || element === undefined) {
			return undefined;
		}

		// As unsubscription in internals of our ResizeObserver abstraction can
		// happen a bit later than effect cleanup invocation - we need a marker,
		// that this handler should not be invoked anymore
		let subscribed = true;

		const handler: UseResizeObserverCallback = (...args) => {
			// It is reinsurance for the highly asynchronous invocations, almost
			// impossible to achieve in tests, thus excluding from LOC
			if (subscribed) {
				cb.current(...args);
			}
		};

		ro.subscribe(element, handler);

		return () => {
			subscribed = false;
			ro.unsubscribe(element, handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tgt, ro]);
}
