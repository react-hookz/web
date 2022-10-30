import { MutableRefObject, RefObject, useEffect } from 'react';
import { off, on } from '../util/misc';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * Triggers callback when user clicks outside the target element.
 *
 * @param ref React ref object with target HTML element.
 * @param callback Callback that will be triggered during the click.
 * @param events Events list that will be used as triggers for outside click.
 * Default: 'mousedown', 'touchstart'
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T> | MutableRefObject<T>,
  callback: EventListener,
  events: string[] = DEFAULT_EVENTS
): void {
  const cbRef = useSyncedRef(callback);
  const refRef = useSyncedRef(ref);

  useEffect(() => {
    function handler(this: HTMLElement, event: Event) {
      if (!refRef.current.current) return;

      const { target: evtTarget } = event;
      const cb = cbRef.current;

      if (!evtTarget || (!!evtTarget && !refRef.current.current.contains(evtTarget as Node))) {
        cb.call(this, event);
      }
    }

    events.forEach((name) => on(document, name, handler, { passive: true }));

    return () => {
      events.forEach((name) => off(document, name, handler, { passive: true }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...events]);
}
