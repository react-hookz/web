import { useMediaQuery } from "../useMediaQuery/useMediaQuery.js";
/**
 * Checks if screen is in `portrait` or `landscape` orientation.
 *
 * As `Screen Orientation API` is still experimental and not supported by Safari, this
 * hook uses CSS3 `orientation` media-query to check screen orientation.
 */
export function useScreenOrientation(options) {
    const matches = useMediaQuery('(orientation: portrait)', {
        initializeWithValue: options?.initializeWithValue ?? true,
    });
    return matches === undefined ? undefined : matches ? 'portrait' : 'landscape';
}
