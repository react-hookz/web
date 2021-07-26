import { DependencyList, RefObject, useMemo } from 'react';
import { useEventListener } from '..';
import { noop, isBrowser } from '../util/const';
import { yieldTrue, yieldFalse } from '../util/misc';

export type IKeyboardEventPredicate = (event: KeyboardEvent) => boolean;
export type IKeyboardEventFilter = null | undefined | string | IKeyboardEventPredicate;
export type IKeyboardEventHandler = (event: KeyboardEvent) => void;

export type IUseKeyboardEventOptions<T extends EventTarget> = {
  event?: 'keydown' | 'keypress' | 'keyup';
  target?: RefObject<T> | T | null;
  eventOptions?: boolean | AddEventListenerOptions;
};

const createKeyPredicate = (keyFilter: IKeyboardEventFilter): IKeyboardEventPredicate => {
  if (typeof keyFilter === 'function') return keyFilter;
  if (typeof keyFilter === 'string') return (event: KeyboardEvent) => event.key === keyFilter;
  return keyFilter ? yieldTrue : yieldFalse;
};

/**
 *  React hook to execute a handler when a key is used
 *  it on unmount.
 *
 * @param keyOrPredicate Key filter can be `string` or callback function accept a KeyboardEvent and return a boolean.
 * @param callback callback function to call when key is used accept a KeyboardEvent
 * @param deps Dependencies list that will be passed to underlying `useMemo`
 * @param options some options passed to addEventListener, event can be `[keydown, keyup, keypress]`, target is the event target default `window`, eventOptions is the third parameter of `addEventListener`.
 */
export function useKeyboardEvent<T extends EventTarget>(
  keyOrPredicate: IKeyboardEventFilter,
  callback: IKeyboardEventHandler = noop,
  deps: DependencyList = [keyOrPredicate],
  options: IUseKeyboardEventOptions<T> = {}
): void {
  const windowOrNull = isBrowser ? window : null;
  const { event = 'keydown', target = windowOrNull, eventOptions } = options;
  const memoHandler = useMemo(() => {
    const predicate: IKeyboardEventPredicate = createKeyPredicate(keyOrPredicate);
    // eslint-disable-next-line func-names
    const handler: IKeyboardEventHandler = function (handlerEvent) {
      if (predicate(handlerEvent)) {
        // @ts-expect-error useEventListener will handle this reference to target
        callback.call(this, handlerEvent);
      }
    };
    return handler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEventListener(target, event, memoHandler, eventOptions);
}
