import { useMediaQuery } from '..';

export type ScreenOrientation = 'portrait' | 'landscape';

/**
 * Checks if screen is in `portrait` or `landscape` orientation.
 *
 * As `Screen Orientation API` is still experimental and not supported by Safari, this
 * hook uses CSS3 `orientation` media-query to check screen orientation.
 */
export function useScreenOrientation(): ScreenOrientation {
  return useMediaQuery('(orientation: portrait)') ? 'portrait' : 'landscape';
}
