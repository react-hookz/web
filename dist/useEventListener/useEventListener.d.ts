import { RefObject } from 'react';
/**
 *  An HTML element or ref object containing an HTML element.
 *
 * @param target An HTML element or ref object containing an HTML element.
 * @param params Parameters specific to the target element's `addEventListener` method. Commonly
 * something like `[eventName, listener, options]`.
 */
export declare function useEventListener<T extends EventTarget>(target: RefObject<T> | T | null, ...params: Parameters<T['addEventListener']> | [string, EventListenerOrEventListenerObject | ((...args: any[]) => any), ...any]): void;
