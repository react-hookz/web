import { useRef } from 'react';

/**
 * Tracks component's render count including first render.
 */
export function useRenderCount(): number {
  const rendersCount = useRef(0);

  return ++rendersCount.current;
}
