import { useRef } from 'react';
/**
 * Tracks component's render count including first render.
 */
export function useRenderCount() {
    const rendersCount = useRef(0);
    return ++rendersCount.current;
}
