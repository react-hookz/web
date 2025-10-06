import type {DependencyList, RefObject} from 'react';
import {useMemo} from 'react';
import {useEventListener} from '../useEventListener/index.js';
import {useSyncedRef} from '../useSyncedRef/index.js';
import {isBrowser} from '../util/const.js';
import {yieldFalse, yieldTrue} from '../util/misc.js';

export type KeyboardEventPredicate = (event: KeyboardEvent) => boolean;
export type KeyboardEventFilter = null | string | boolean | KeyboardEventPredicate;
export type KeyboardEventHandler<T extends EventTarget> = (this: T, event: KeyboardEvent) => void;

export type UseKeyboardEventOptions<T extends EventTarget> = {
	/**
	 * Keyboard event which triggers `callback`.
	 * @default `keydown`
	 */
	event?: 'keydown' | 'keypress' | 'keyup';
	/**
	 * Target element that emits `event`.
	 * @default window
	 */
	target?: RefObject<T | null> | T | null;
	/**
	 * Options passed to the underlying `useEventListener` hook.
	 */
	eventOptions?: boolean | AddEventListenerOptions;
};

const createKeyPredicate = (keyFilter: KeyboardEventFilter): KeyboardEventPredicate => {
	if (typeof keyFilter === 'function') {
		return keyFilter;
	}

	if (typeof keyFilter === 'string') {
		return (ev) => ev.key === keyFilter;
	}

	return keyFilter ? yieldTrue : yieldFalse;
};

const WINDOW_OR_NULL = isBrowser ? globalThis : null;

/**
 * Invokes a callback when a keyboard event occurs on the chosen target element.
 *
 * @param keyOrPredicate Filters key presses on which `callback` is invoked.
 * @param callback Function to call when a key is pressed and `keyOrPredicate` matches positive.
 * @param deps Dependencies list that is passed to the underlying `useMemo`.
 * @param options Hook options.
 */
export function useKeyboardEvent<T extends EventTarget>(
	keyOrPredicate: KeyboardEventFilter,
	callback: KeyboardEventHandler<T>,
	deps: DependencyList = [],
	options: UseKeyboardEventOptions<T> = {},
): void {
	const {event = 'keydown', target = WINDOW_OR_NULL, eventOptions} = options;
	const cbRef = useSyncedRef(callback);

	const handler = useMemo<KeyboardEventHandler<T>>(() => {
		const predicate = createKeyPredicate(keyOrPredicate);

		return function (this: T, ev) {
			if (predicate(ev)) {
				cbRef.current.call(this, ev);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	useEventListener(target, event, handler, eventOptions);
}
