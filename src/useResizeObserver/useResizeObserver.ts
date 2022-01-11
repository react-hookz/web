import { RefObject, useEffect } from 'react';
import { useSyncedRef } from '..';
import { isBrowser } from '../util/const';

export type IUseResizeObserverCallback = (entry: ResizeObserverEntry) => void;

interface IResizeObserverSingleton {
  observer: ResizeObserver;
  subscribe: (target: Element, callback: IUseResizeObserverCallback) => void;
  unsubscribe: (target: Element, callback: IUseResizeObserverCallback) => void;
}

let observerSingleton: IResizeObserverSingleton;

function getResizeObserver(): IResizeObserverSingleton | undefined {
  if (!isBrowser) return undefined;

  if (observerSingleton) return observerSingleton;

  const callbacks = new Map<Element, Set<IUseResizeObserverCallback>>();

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
        cbs = new Set<IUseResizeObserverCallback>();
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
  callback: IUseResizeObserverCallback,
  enabled = true
): void {
  const ro = enabled && getResizeObserver();
  const cb = useSyncedRef(callback);

  useEffect(() => {
    if (!ro) return;

    // as unsubscription in internals of our ResizeObserver abstraction can
    // happen a bit later than effect cleanup invocation - we need a marker,
    // that this handler should not be invoked anymore
    let subscribed = true;

    const tgt = target && 'current' in target ? target.current : target;
    if (!tgt) return;

    const handler: IUseResizeObserverCallback = (...args) => {
      // it is reinsurance for the highly asynchronous invocations, almost
      // impossible to achieve in tests, thus excluding from LOC
      /* istanbul ignore else */
      if (subscribed) {
        cb.current(...args);
      }
    };

    ro.subscribe(tgt, handler);

    // eslint-disable-next-line consistent-return
    return () => {
      subscribed = false;
      ro.unsubscribe(tgt, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ro]);
}
