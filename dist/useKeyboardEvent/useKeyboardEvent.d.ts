import { DependencyList, RefObject } from 'react';
export type KeyboardEventPredicate = (event: KeyboardEvent) => boolean;
export type KeyboardEventFilter = null | undefined | string | boolean | KeyboardEventPredicate;
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
    target?: RefObject<T> | T | null;
    /**
     * Options passed to the underlying `useEventListener` hook.
     */
    eventOptions?: boolean | AddEventListenerOptions;
};
/**
 * Invokes a callback when a keyboard event occurs on the chosen target element.
 *
 * @param keyOrPredicate Filters key presses on which `callback` is invoked.
 * @param callback Function to call when a key is pressed and `keyOrPredicate` matches positive.
 * @param deps Dependencies list that is passed to the underlying `useMemo`.
 * @param options Hook options.
 */
export declare function useKeyboardEvent<T extends EventTarget>(keyOrPredicate: KeyboardEventFilter, callback: KeyboardEventHandler<T>, deps?: DependencyList, options?: UseKeyboardEventOptions<T>): void;
