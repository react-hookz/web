/**
 * Provides vibration feedback using the Vibration API.
 *
 * @param enabled Whether to perform vibration or not.
 * @param pattern VibrationPattern passed down to `navigator.vibrate`.
 * @param loop If true - vibration will be looped using `setInterval`.
 */
export declare const useVibrate: (enabled: boolean, pattern: VibratePattern, loop?: boolean) => void;
