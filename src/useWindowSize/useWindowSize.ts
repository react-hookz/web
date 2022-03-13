import { useEffect } from 'react';
import { useFirstMountState, useMountEffect, useRafState } from '..';
import { isBrowser } from '../util/const';

export interface WindowSize {
  width: number;
  height: number;
}

const listeners = new Set<(size: WindowSize) => void>();

const callAllListeners = () => {
  listeners.forEach((l) => {
    l({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
};

/**
 * Tracks window inner dimensions.
 *
 * @param stateHook State hook that will be used internally. Default: `useRafState`.
 * @param measureOnMount Perform size fetch during mount effect stage or synchronously with render.
 */
export function useWindowSize(stateHook = useRafState, measureOnMount?: boolean): WindowSize {
  const isFirstMount = useFirstMountState();
  const [size, setSize] = stateHook<WindowSize>({
    width: isFirstMount && isBrowser && !measureOnMount ? window.innerWidth : 0,
    height: isFirstMount && isBrowser && !measureOnMount ? window.innerHeight : 0,
  });

  useMountEffect(() => {
    if (measureOnMount) {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  });

  useEffect(() => {
    if (listeners.size === 0) {
      window.addEventListener('resize', callAllListeners, { passive: true });
    }

    listeners.add(setSize);

    return () => {
      listeners.delete(setSize);

      if (listeners.size === 0) {
        window.removeEventListener('resize', callAllListeners);
      }
    };
  }, [setSize]);

  return size;
}
