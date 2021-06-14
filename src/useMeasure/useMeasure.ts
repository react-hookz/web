import { RefObject, useRef } from 'react';
import { useSafeState, IUseResizeObserverCallback, useResizeObserver, useRafCallback } from '..';

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 */
export function useMeasure<T extends Element>(): [DOMRectReadOnly | undefined, RefObject<T>] {
  const elementRef = useRef<T>(null);
  const [rect, setRect] = useSafeState<DOMRectReadOnly>();
  const [observerHandler] = useRafCallback<IUseResizeObserverCallback>((entry) =>
    setRect(entry.contentRect)
  );

  useResizeObserver(elementRef, observerHandler);

  return [rect, elementRef];
}
