export type ScreenOrientation = 'portrait' | 'landscape';
interface UseScreenOrientationOptions {
    initializeWithValue?: boolean;
}
/**
 * Checks if screen is in `portrait` or `landscape` orientation.
 *
 * As `Screen Orientation API` is still experimental and not supported by Safari, this
 * hook uses CSS3 `orientation` media-query to check screen orientation.
 */
export declare function useScreenOrientation(options?: UseScreenOrientationOptions): ScreenOrientation | undefined;
export {};
