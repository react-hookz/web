import { RefObject, useEffect } from 'react';
import { useSafeState } from '..';

const DEFAULT_THRESHOLD = [0];
const DEFAULT_ROOT_MARGIN = '0px';

interface IIntersectionEntryCallback {
  (entry: IntersectionObserverEntry): void;
}

interface IObserverEntry {
  observer: IntersectionObserver;
  observe: (target: Element, callback: IIntersectionEntryCallback) => void;
  unobserve: (target: Element, callback: IIntersectionEntryCallback) => void;
}

const observers: Map<Element | Document, Map<string, IObserverEntry>> = new Map();

const getObserverEntry = (options: IntersectionObserverInit): IObserverEntry => {
  const root = options.root ?? document;

  let rootObservers = observers.get(root);

  if (!rootObservers) {
    rootObservers = new Map();
    observers.set(root, rootObservers);
  }

  const opt = JSON.stringify([options.rootMargin, options.threshold]);

  let entry = rootObservers.get(opt);

  if (!entry) {
    const callbacks = new Map<Element, Set<IIntersectionEntryCallback>>();

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          callbacks.get(e.target)?.forEach((cb) => setTimeout(() => cb(e), 0))
        ),
      options
    );

    entry = {
      observer,
      observe(target, callback) {
        let cbs = callbacks.get(target);

        if (!cbs) {
          // if target has no observers yet - register it
          cbs = new Set();
          callbacks.set(target, cbs);
          observer.observe(target);
        }

        // as Set is duplicate-safe - simply add callback on each call
        cbs.add(callback);
      },
      unobserve(target, callback) {
        const cbs = callbacks.get(target);

        // else branch should never occur in case of normal execution
        // because callbacks map is hidden in closure - it is impossible to
        // simulate situation with non-existent `cbs` Set
        /* istanbul ignore else */
        if (cbs) {
          // remove current observer
          cbs.delete(callback);

          if (!cbs.size) {
            // if no observers left unregister target completely
            callbacks.delete(target);
            observer.unobserve(target);

            // if not tracked elements left - disconnect observer
            if (!callbacks.size) {
              observer.disconnect();
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              rootObservers!.delete(opt);

              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              if (!rootObservers!.size) {
                observers.delete(root);
              }
            }
          }
        }
      },
    };

    rootObservers.set(opt, entry);
  }

  return entry;
};

export interface IUseIntersectionObserverOptions {
  /**
   * An Element or Document object (or it's react reference) which is an
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
export function useIntersectionObserver<T extends Element>(
  target: RefObject<T> | T | null,
  {
    threshold = DEFAULT_THRESHOLD,
    root: r,
    rootMargin = DEFAULT_ROOT_MARGIN,
  }: IUseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const [state, setState] = useSafeState<IntersectionObserverEntry>();

  useEffect(() => {
    const tgt = target && 'current' in target ? target.current : target;
    if (!tgt) return undefined;

    let subscribed = true;
    const observerEntry = getObserverEntry({
      root: r && 'current' in r ? r.current : r,
      rootMargin,
      threshold,
    });

    const handler: IIntersectionEntryCallback = (entry) => {
      // it is reinsurance for the highly asynchronous invocations, almost
      // impossible to achieve in tests, thus excluding from LOC
      /* istanbul ignore else */
      if (subscribed) {
        setState(entry);
      }
    };

    observerEntry.observe(tgt, handler);

    return () => {
      subscribed = false;
      observerEntry.unobserve(tgt, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, r, rootMargin, ...threshold]);

  return state;
}
