/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useMemo } from 'react';
import { useIsMounted, useSyncedRef } from '..';
import { hasOwnProperty } from '../util/misc';

/**
 *  Subscribes an event listener to the target, and automatically unsubscribes
 *  it on unmount.
 *
 * @param target Element ref object or element itself.
 * @param params Parameters specific for target's `addEventListener`. Commonly,
 * it is `[eventName, listener, options]`.
 */
export function useEventListener<T extends EventTarget>(
  target: RefObject<T> | T | null,
  ...params:
    | Parameters<T['addEventListener']>
    | [string, EventListenerOrEventListenerObject | ((...args: any[]) => any), ...any]
): void {
  const isMounted = useIsMounted();

  // create static event listener
  const listenerRef = useSyncedRef(params[1]);
  const eventListener = useMemo<EventListener>(
    () =>
      // as some event listeners designed to be used through `this`
      // it is better to make listener a conventional function as it
      // infers call context
      // eslint-disable-next-line func-names
      function (this: T, ...args) {
        // normally, such situation should not happen, but better to
        // have back covered
        /* istanbul ignore next */
        if (!isMounted()) return;

        // we dont care if non-listener provided, simply dont do anything
        /* istanbul ignore else */
        if (typeof listenerRef.current === 'function') {
          listenerRef.current.apply(this, args);
        } else if (typeof (listenerRef.current as EventListenerObject).handleEvent === 'function') {
          (listenerRef.current as EventListenerObject).handleEvent.apply(this, args);
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const tgt = target && hasOwnProperty(target, 'current') ? target.current : target;
    if (!tgt) return;

    const restParams = params.slice(2);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    tgt.addEventListener(params[0], eventListener, ...restParams);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return () => tgt.removeEventListener(params[0], eventListener, ...restParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, params[0]]);
}
