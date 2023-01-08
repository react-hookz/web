import { MutableRefObject } from 'react';
export interface Measures {
    width: number;
    height: number;
}
/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export declare function useMeasure<T extends Element>(enabled?: boolean): [Measures | undefined, MutableRefObject<T | null>];
