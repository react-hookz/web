import { useEffect } from 'react';
import { isBrowser, noop } from '../util/const';

/**
 * Provides vibration feedback using the Vibration API.
 *
 * @param enabled Whether to perform vibration or not.
 * @param pattern VibrationPattern passed down to `navigator.vibrate`.
 * @param loop If true - vibration will be looped using `setInterval`.
 */
export const useVibrate =
  !isBrowser || navigator.vibrate === undefined
    ? noop
    : function useVibrate(enabled: boolean, pattern: VibratePattern, loop?: boolean): void {
        useEffect(() => {
          let interval: undefined | ReturnType<typeof setInterval>;

          if (enabled) {
            navigator.vibrate(pattern);

            if (loop) {
              interval = setInterval(
                () => {
                  navigator.vibrate(pattern);
                },
                Array.isArray(pattern) ? pattern.reduce((a, n) => a + n, 0) : pattern
              );
            }

            return () => {
              navigator.vibrate(0);

              if (interval) {
                clearInterval(interval);
              }
            };
          }
        }, [loop, pattern, enabled]);
      };
