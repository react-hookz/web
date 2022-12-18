import { useCallback, useState } from 'react';

import { useEventListener } from '../useEventListener/useEventListener';
import { isBrowser } from '../util/const';

/**
 * Returns a boolean indicating whether the window is visible or not.
 * @param ssrValue Value to return on server-side rendering.
 */
export function useWindowVisibility(ssrValue = true): boolean {
  const [isVisible, setIsVisible] = useState(document.visibilityState === 'visible');

  const handleVisibilityChange = useCallback(() => {
    setIsVisible(document.visibilityState === 'visible');
  }, []);

  useEventListener(document, 'visibilitychange', handleVisibilityChange);

  if (!isBrowser) {
    return ssrValue;
  }

  return isVisible;
}
