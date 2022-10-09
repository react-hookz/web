import { DependencyList, RefObject, useMemo } from 'react';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { useEventListener } from '../useEventListener/useEventListener';
import { isBrowser } from '../util/const';
import { yieldFalse, yieldTrue } from '../util/misc';

export type KeyboardEventPredicate = (event: KeyboardEvent) => boolean;
export type KeyboardEventFilter = null | undefined | string | boolean | KeyboardEventPredicate;
export type KeyboardEventHandler<T extends EventTarget> = (this: T, event: KeyboardEvent) => void;

export type UseKeyboardEventOptions<T extends EventTarget> = {
  /**
   * Event name that triggers handler.
   * @default `keydown`
   */
  event?: 'keydown' | 'keypress' | 'keyup';
  /**
   * Target that should emit event.
   * @default window
   */
  target?: RefObject<T> | T | null;
  /**
   * Options that will be passed to underlying `useEventListener` hook.
   */
  eventOptions?: boolean | AddEventListenerOptions;
};

const createKeyPredicate = (keyFilter: KeyboardEventFilter): KeyboardEventPredicate => {
  if (typeof keyFilter === 'function') return keyFilter;
  if (typeof keyFilter === 'string') return (ev) => ev.key === keyFilter;
  return keyFilter ? yieldTrue : yieldFalse;
};

const WINDOW_OR_NULL = isBrowser ? window : null;

/**
 * Executes callback when keyboard event occurred on target (window by default).
 *
 * @param keyOrPredicate Filters keypresses on which `callback` will be executed.
 * @param callback Function to call when key is pressed and `keyOrPredicate` matches positive.
 * @param deps Dependencies list that will be passed to underlying `useMemo`.
 * @param options Hook options.
 */
export function useKeyboardEvent<T extends EventTarget>(
  keyOrPredicate: KeyboardEventFilter,
  callback: KeyboardEventHandler<T>,
  deps?: DependencyList,
  options: UseKeyboardEventOptions<T> = {}
): void {
  const { event = 'keydown', target = WINDOW_OR_NULL, eventOptions } = options;
  const cbRef = useSyncedRef(callback);

  const handler = useMemo<KeyboardEventHandler<T>>(() => {
    const predicate = createKeyPredicate(keyOrPredicate);

    return function kbEventHandler(this: T, ev) {
      if (predicate(ev)) {
        cbRef.current.call(this, ev);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEventListener(target, event, handler, eventOptions);
}
