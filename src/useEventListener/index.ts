/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useMemo } from 'react';
import { useIsMounted } from '../useIsMounted';
import { useSyncedRef } from '../useSyncedRef';
import { hasOwnProperty, off, on } from '../util/misc';

/**
 *  An HTML element or ref object containing an HTML element.
 *
 * @param target An HTML element or ref object containing an HTML element.
 * @param params Parameters specific to the target element's `addEventListener` method. Commonly
 * something like `[eventName, listener, options]`.
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
    const tgt =
      target && hasOwnProperty(target, 'current') ? (target as RefObject<T>).current : target;
    if (!tgt) return;

    const restParams = params.slice(2);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    on(tgt, params[0], eventListener, ...restParams);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return () => off(tgt, params[0], eventListener, ...restParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, params[0]]);
}
