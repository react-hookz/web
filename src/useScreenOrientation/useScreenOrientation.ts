import { useMediaQuery } from '../useMediaQuery/useMediaQuery';

export type ScreenOrientation = 'portrait' | 'landscape';

/**
 * Checks if screen is in `portrait` or `landscape` orientation.
 *
 * As `Screen Orientation API` is still experimental and not supported by Safari, this
 * hook uses CSS3 `orientation` media-query to check screen orientation.
 */
export function useScreenOrientation(): ScreenOrientation | undefined {
  const matches = useMediaQuery('(orientation: portrait)');

  return typeof matches === 'undefined' ? undefined : matches ? 'portrait' : 'landscape';
}
