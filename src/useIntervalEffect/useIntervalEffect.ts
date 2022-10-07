import { useEffect } from 'react';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

/**
 * A Map of delay -> `callSynchronized` intervals for removal when unused.
 */
const intervalMap = new Map<number, ReturnType<typeof setInterval>>();

/**
 * A Map of delay -> callbacks array.
 *
 * Note that the array is mutable: a single array that is changed as entries are
 * added and removed, rather than spamming the GC when anything changes.
 */
const callbackMap = new Map<number, Array<{ current: () => void }>>();

/**
 * Call all functions that have the same delay sequentially.
 *
 * @param ms Interval delay in milliseconds.
 */
const callSynchronized = (ms: number) => {
  const callbacks = callbackMap.get(ms);

  if (callbacks) {
    for (const callback of callbacks) {
      try {
        callback.current();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

/**
 * Like `setInterval` but in form of react hook.
 *
 * @param callback Callback to be called within interval.
 * @param ms Interval delay in milliseconds, `undefined` disables the interval.
 * Keep in mind, that changing this parameter will re-set interval, meaning
 * that it will be set as new after the change.
 * @param synchronize Should all callbacks on the same delay fire simultaniously.
 */
export function useIntervalEffect(callback: () => void, ms?: number, synchronize = false): void {
  const cbRef = useSyncedRef(callback);

  useEffect(() => {
    if (!ms && ms !== 0) {
      return;
    }

    if (synchronize) {
      if (callbackMap.has(ms)) {
        callbackMap.get(ms)!.splice(-1, 0, cbRef);
      } else {
        callbackMap.set(ms, [cbRef]);
      }
      if (!intervalMap.has(ms)) {
        intervalMap.set(ms, setInterval(callSynchronized, ms, ms));
      }

      return () => {
        const callbacks = callbackMap.get(ms);

        if (!callbacks?.splice(callbacks.indexOf(cbRef), 1).length) {
          clearInterval(intervalMap.get(ms)!);
          callbackMap.delete(ms);
          intervalMap.delete(ms);
        }
      };
    } else {
      const id = setInterval(() => cbRef.current(), ms);

      return () => clearInterval(id);
    }
  }, [ms, !synchronize]);
}
