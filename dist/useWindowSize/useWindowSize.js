import { useEffect } from 'react';
import { useFirstMountState } from "../useFirstMountState/useFirstMountState.js";
import { useMountEffect } from "../useMountEffect/useMountEffect.js";
import { useRafState } from "../useRafState/useRafState.js";
import { isBrowser } from "../util/const.js";
const listeners = new Set();
const callAllListeners = () => {
    listeners.forEach((l) => {
        l({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    });
};
/**
 * Tracks the inner dimensions of the browser window.
 *
 * @param stateHook State hook that will be used to hold the dimensions of the window.
 * @param measureOnMount If `true`, the size of the window will be measured during the effects
  stage, after the component has mounted. If `false`, the window size is measured synchronously during
  the component render. Set this to `true` during SSR.
 */
export function useWindowSize(stateHook = useRafState, measureOnMount) {
    const isFirstMount = useFirstMountState();
    const [size, setSize] = stateHook({
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
