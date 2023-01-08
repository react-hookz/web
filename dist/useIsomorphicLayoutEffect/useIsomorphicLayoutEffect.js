import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from "../util/const.js";
/**
 * Alias for `useLayoutEffect` in browser, but for `useEffect` at server side. Helps to avoid
 * warning shown during SSR.
 */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
