import { useEffect } from 'react';
/**
 * Alias for `useLayoutEffect` in browser, but for `useEffect` at server side. Helps to avoid
 * warning shown during SSR.
 */
export declare const useIsomorphicLayoutEffect: typeof useEffect;
