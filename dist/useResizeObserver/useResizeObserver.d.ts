import { RefObject } from 'react';
export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;
/**
 * Invokes a callback whenever ResizeObserver detects a change to target's size.
 *
 * @param target React reference or Element to track.
 * @param callback Callback that will be invoked on resize.
 * @param enabled Whether resize observer is enabled or not.
 */
export declare function useResizeObserver<T extends Element>(target: RefObject<T> | T | null, callback: UseResizeObserverCallback, enabled?: boolean): void;
