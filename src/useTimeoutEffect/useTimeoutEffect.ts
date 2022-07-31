import { useCallback, useEffect } from 'react';
import { useSyncedRef, useHookableRef } from '..';

type TimeoutID = ReturnType<typeof setTimeout> | null;

const cancelTimeout = (id: TimeoutID) => {
  if (id) {
    clearTimeout(id);
  }
};

/**
 * Like `setTimeout` but in the form of a react hook.
 *
 * @param callback Callback to be called after the timeout.
 * @param ms Timeout delay in milliseconds. `undefined` disables the timeout.
 * Keep in mind, that changing this parameter will re-set timeout, meaning
 * that it will be set as new after the change.
 */
export function useTimeoutEffect(callback: () => void, ms?: number): [() => void, () => void] {
  const cbRef = useSyncedRef(callback);
  const timeoutIdRef = useHookableRef<TimeoutID>(null, (v) => {
    cancelTimeout(timeoutIdRef.current);
    return v;
  });

  const cancel = useCallback(() => {
    cancelTimeout(timeoutIdRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    if (!ms && ms !== 0) {
      return;
    }
    timeoutIdRef.current = setTimeout(() => cbRef.current(), ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms]);

  useEffect(() => {
    reset();
    return cancel;
  }, [cancel, reset]);

  return [cancel, reset];
}
