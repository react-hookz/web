import { MutableRefObject } from 'react';
import {
  UseResizeObserverCallback,
  useHookableRef,
  useRafCallback,
  useResizeObserver,
  useSafeState,
} from '..';

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export function useMeasure<T extends Element>(
  enabled = true
): [DOMRectReadOnly | undefined, MutableRefObject<T | null>] {
  const [element, setElement] = useSafeState<T | null>(null);
  const elementRef = useHookableRef<T | null>(null, (v) => {
    setElement(v);

    return v;
  });

  const [rect, setRect] = useSafeState<DOMRectReadOnly>();
  const [observerHandler] = useRafCallback<UseResizeObserverCallback>((entry) =>
    setRect(entry.target.getBoundingClientRect())
  );

  useResizeObserver(element, observerHandler, enabled);

  return [rect, elementRef];
}
