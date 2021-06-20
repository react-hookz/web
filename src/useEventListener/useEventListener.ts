/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, RefObject, useEffect, useMemo } from 'react';
import { hasOwnProperty } from '../util/misc';
import { useSyncedRef, useIsMounted } from '..';

type ITargetOrTargetRef<T extends EventTarget> = T | null | RefObject<T> | MutableRefObject<T>;

/**
 *  Subscribes an event listener to the target, and automatically unsubscribes
 *  it on unmount.
 *
 * @param target Element ref object or element itself.
 * @param params Parameters specific for target's `addEventListener`. In common,
 * it is `[eventName, listener, options]`.
 */
export function useEventListener<T extends EventTarget>(
  target: ITargetOrTargetRef<T>,
  ...params:
    | Parameters<T['addEventListener']>
    | [string, EventListenerOrEventListenerObject | ((...args: any[]) => any), ...any]
): void {
  // extract current target from ref object
  const tgt: T =
    target && hasOwnProperty(target, 'current')
      ? (target as MutableRefObject<T>).current
      : (target as T);
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
    if (!tgt) return undefined;

    const restParams = params.slice(2);

    tgt.addEventListener(params[0], eventListener, ...restParams);

    return () => tgt.removeEventListener(params[0], eventListener, ...restParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tgt, params[0]]);
}
