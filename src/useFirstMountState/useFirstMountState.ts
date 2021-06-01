import { useEffect, useRef } from 'react';

/**
 * Return boolean that is `true` only on first render.
 */
export function useFirstMountState(): boolean {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return isFirstMount.current;
}
