import { useEffect, useRef } from 'react';

import type { RefObject } from 'react';
import { useWindowSize } from '../useWindowSize';

/**
 * Will style the referenced text to be at the chosen percentage of its parent element.
 *
 * @param percentage percentage of the ration between parent and text `default = 5`
 * @returns `[RefObject<T>]`
 */
export function useResponsiveText<T extends HTMLElement | null>(percentage = 5): [RefObject<T>] {
  const { width } = useWindowSize();
  const ref = useRef<T>(null);

  const responsiveText = <P extends HTMLElement | null>(flexRef: RefObject<P>) => {
    const el = flexRef.current;
    if (flexRef && el) {
      const relSize = (el?.parentElement?.offsetWidth || 0) * (percentage / 100);
      el.style.fontSize = `${relSize}px`;
    }
  };

  useEffect(() => {
    responsiveText<T>(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return [ref];
}
