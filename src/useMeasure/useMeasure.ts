import { RefObject, useRef } from 'react';
import { useSafeState, IUseResizeObserverCallback, useResizeObserver, useRafCallback } from '..';

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export function useMeasure<T extends Element>(
  enabled = true
): [DOMRectReadOnly | undefined, RefObject<T>] {
  const elementRef = useRef<T>(null);
  const [rect, setRect] = useSafeState<DOMRectReadOnly>();
  const [observerHandler] = useRafCallback<IUseResizeObserverCallback>((entry) =>
    setRect(entry.contentRect)
  );

  useResizeObserver(elementRef, observerHandler, enabled);

  return [rect, elementRef];
}
