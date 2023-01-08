import { RefObject } from 'react';
export interface UseIntersectionObserverOptions {
    /**
     * An Element or Document object (or its react reference) which is an
     * ancestor of the intended target, whose bounding rectangle will be
     * considered the viewport. Any part of the target not visible in the visible
     * area of the root is not considered visible.
     */
    root?: RefObject<Element | Document> | Element | Document | null;
    /**
     * A string which specifies a set of offsets to add to the root's bounding_box
     * when calculating intersections, effectively shrinking or growing the root
     * for calculation purposes. The syntax is approximately the same as that for
     * the CSS margin property; The default is `0px`.
     */
    rootMargin?: string;
    /**
     * Array of numbers between 0.0 and 1.0, specifying a ratio of intersection
     * area to total bounding box area for the observed target. A value of 0.0
     * means that even a single visible pixel counts as the target being visible.
     * 1.0 means that the entire target element is visible.
     * The default is a threshold of `[0]`.
     */
    threshold?: number[];
}
/**
 * Tracks intersection of a target element with an ancestor element or with a
 * top-level document's viewport.
 *
 * @param target React reference or Element to track.
 * @param options Like `IntersectionObserver` options but `root` can also be
 * react reference
 */
export declare function useIntersectionObserver<T extends Element>(target: RefObject<T> | T | null, { threshold, root: r, rootMargin, }?: UseIntersectionObserverOptions): IntersectionObserverEntry | undefined;
