import { useCallback, useState } from 'react';

import { useEventListener } from '../useEventListener/useEventListener';
import { isBrowser } from '../util/const';

/**
 * Returns a boolean indicating whether the window is visible or not.
 * @param initializeWithValue Value to return on server-side rendering.
 */
export function useDocumentVisibility(initializeWithValue = true): boolean {
  const [isVisible, setIsVisible] = useState(isBrowser && document.visibilityState === 'visible');

  const handleVisibilityChange = useCallback(() => {
    setIsVisible(document.visibilityState === 'visible');
  }, []);

  useEventListener(document, 'visibilitychange', handleVisibilityChange);

  if (!isBrowser) {
    return initializeWithValue;
  }

  return isVisible;
}
