/**
 * Like `setInterval` but in form of react hook.
 *
 * @param callback Callback to be called within interval.
 * @param ms Interval delay in milliseconds, `undefined` disables the interval.
 * Keep in mind, that changing this parameter will re-set interval, meaning
 * that it will be set as new after the change.
 */
export declare function useIntervalEffect(callback: () => void, ms?: number): void;
