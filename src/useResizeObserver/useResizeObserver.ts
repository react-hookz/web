import { RefObject, useEffect } from 'react';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { isBrowser } from '../util/const';

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

interface ResizeObserverSingleton {
  observer: ResizeObserver;
  subscribe: (target: Element, callback: UseResizeObserverCallback) => void;
  unsubscribe: (target: Element, callback: UseResizeObserverCallback) => void;
}

let observerSingleton: ResizeObserverSingleton;

function getResizeObserver(): ResizeObserverSingleton | undefined {
  if (!isBrowser) return undefined;

  if (observerSingleton) return observerSingleton;

  const callbacks = new Map<Element, Set<UseResizeObserverCallback>>();

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) =>
      callbacks.get(entry.target)?.forEach((cb) => setTimeout(() => cb(entry), 0))
    );
  });

  observerSingleton = {
    observer,
    subscribe: (target, callback) => {
      let cbs = callbacks.get(target);

      if (!cbs) {
        // if target has no observers yet - register it
        cbs = new Set<UseResizeObserverCallback>();
        callbacks.set(target, cbs);
        observer.observe(target);
      }

      // as Set is duplicate-safe - simply add callback on each call
      cbs.add(callback);
    },
    unsubscribe: (target, callback) => {
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
        }
      }
    },
  };

  return observerSingleton;
}

/**
 * Invokes a callback whenever ResizeObserver detects a change to target's size.
 *
 * @param target React reference or Element to track.
 * @param callback Callback that will be invoked on resize.
 * @param enabled Whether resize observer is enabled or not.
 */
export function useResizeObserver<T extends Element>(
  target: RefObject<T> | T | null,
  callback: UseResizeObserverCallback,
  enabled = true
): void {
  const ro = enabled && getResizeObserver();
  const cb = useSyncedRef(callback);

  const tgt = target && 'current' in target ? target.current : target;

  useEffect(() => {
    // this secondary target resolve required for case when we receive ref object, which, most
    // likely, contains null during render stage, but already populated with element during
    // effect stage.
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const tgt = target && 'current' in target ? target.current : target;

    if (!ro || !tgt) return;

    // as unsubscription in internals of our ResizeObserver abstraction can
    // happen a bit later than effect cleanup invocation - we need a marker,
    // that this handler should not be invoked anymore
    let subscribed = true;

    const handler: UseResizeObserverCallback = (...args) => {
      // it is reinsurance for the highly asynchronous invocations, almost
      // impossible to achieve in tests, thus excluding from LOC
      /* istanbul ignore else */
      if (subscribed) {
        cb.current(...args);
      }
    };

    ro.subscribe(tgt, handler);

    return () => {
      subscribed = false;
      ro.unsubscribe(tgt, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tgt, ro]);
}
