import { useEffect, useRef } from 'react';

export function useFirstMountState(): boolean {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, [])

  return isFirstMount.current
}
