import { useResizeObserver, } from "../useResizeObserver/useResizeObserver.js";
import { useHookableRef } from "../useHookableRef/useHookableRef.js";
import { useRafCallback } from "../useRafCallback/useRafCallback.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export function useMeasure(enabled = true) {
    const [element, setElement] = useSafeState(null);
    const elementRef = useHookableRef(null, (v) => {
        setElement(v);
        return v;
    });
    const [measures, setMeasures] = useSafeState();
    const [observerHandler] = useRafCallback((entry) => setMeasures({ width: entry.contentRect.width, height: entry.contentRect.height }));
    useResizeObserver(element, observerHandler, enabled);
    return [measures, elementRef];
}
