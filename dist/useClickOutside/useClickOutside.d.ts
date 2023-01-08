import { MutableRefObject, RefObject } from 'react';
/**
 * Triggers a callback when the user clicks outside a target element.
 *
 * @param ref React ref object containing the target HTML element.
 * @param callback Callback invoked when the user clicks outside the target element.
 * @param events List of events that will be used as triggers for the outside click. Default:
 * 'mousedown', 'touchstart'
 */
export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T> | MutableRefObject<T>, callback: EventListener, events?: string[]): void;
