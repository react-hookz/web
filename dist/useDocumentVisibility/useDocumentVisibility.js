import { useState } from 'react';
import { useEventListener } from "../useEventListener/useEventListener.js";
import { useMountEffect } from "../useMountEffect/useMountEffect.js";
import { isBrowser } from "../util/const.js";
const isDocumentVisible = () => document.visibilityState === 'visible';
/**
 * Returns a boolean indicating whether the document is visible or not.
 *
 * @param initializeWithValue Whether to initialize state with the cookie value or `undefined`.
 *        _We suggest setting this to `false` during SSR._
 */
export function useDocumentVisibility(initializeWithValue = true) {
    const [isVisible, setIsVisible] = useState(isBrowser && initializeWithValue ? isDocumentVisible() : undefined);
    useMountEffect(() => {
        if (!initializeWithValue) {
            setIsVisible(isDocumentVisible());
        }
    });
    useEventListener(isBrowser ? document : null, 'visibilitychange', () => setIsVisible(isDocumentVisible()));
    return isVisible;
}
