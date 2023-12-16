import { useCallback, useEffect, useRef } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';

type TimeoutID = ReturnType<typeof setTimeout> | null;

const cancelTimeout = (id: TimeoutID) => {
	if (id) {
		clearTimeout(id);
	}
};

/**
 * Like `setTimeout` but in the form of a react hook.
 *
 * @param callback Callback to be called after the timeout. Changing this
 * will not reset the timeout.
 * @param ms Timeout delay in milliseconds. `undefined` disables the timeout.
 * Keep in mind, that changing this parameter will re-set timeout, meaning
 * that it will be set as new after the change.
 */
export function useTimeoutEffect(
	callback: () => void,
	ms?: number
): [cancel: () => void, reset: () => void] {
	const cbRef = useSyncedRef(callback);
	const msRef = useSyncedRef(ms);
	const timeoutIdRef = useRef<TimeoutID>(null);

	const cancel = useCallback(() => {
		cancelTimeout(timeoutIdRef.current);
	}, []);

	const reset = useCallback(() => {
		if (msRef.current === undefined) return;

		cancel();
		timeoutIdRef.current = setTimeout(() => {
			cbRef.current();
		}, msRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		reset();
		return cancel;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ms]);

	return [cancel, reset];
}
