/**
 * Like `setTimeout` but in the form of a react hook.
 *
 * @param callback Callback to be called after the timeout. Changing this
 * will not reset the timeout.
 * @param ms Timeout delay in milliseconds. `undefined` disables the timeout.
 * Keep in mind, that changing this parameter will re-set timeout, meaning
 * that it will be set as new after the change.
 */
export declare function useTimeoutEffect(callback: () => void, ms?: number): [cancel: () => void, reset: () => void];
