import { MutableRefObject, useRef } from 'react';
import { IUseResizeObserverCallback, useRafCallback, useResizeObserver, useSafeState } from '..';

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export function useMeasure<T extends Element>(
  enabled = true
): [DOMRectReadOnly | undefined, MutableRefObject<T | null>] {
  const elementRef = useRef<T | null>(null);
  const [rect, setRect] = useSafeState<DOMRectReadOnly>();
  const [observerHandler] = useRafCallback<IUseResizeObserverCallback>((entry) =>
    setRect(entry.contentRect)
  );

  useResizeObserver(elementRef, observerHandler, enabled);

  return [rect, elementRef];
}
