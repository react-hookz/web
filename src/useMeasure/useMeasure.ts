import { MutableRefObject } from 'react';
import {
  UseResizeObserverCallback,
  useResizeObserver,
} from '../useResizeObserver/useResizeObserver';
import { useHookableRef } from '../useHookableRef/useHookableRef';
import { useRafCallback } from '../useRafCallback/useRafCallback';
import { useSafeState } from '../useSafeState/useSafeState';

export interface Measures {
  width: number;
  height: number;
}

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 */
export function useMeasure<T extends Element>(
  enabled = true
): [Measures | undefined, MutableRefObject<T | null>] {
  const [element, setElement] = useSafeState<T | null>(null);
  const elementRef = useHookableRef<T | null>(null, (v) => {
    setElement(v);

    return v;
  });

  const [measures, setMeasures] = useSafeState<Measures>();
  const [observerHandler] = useRafCallback<UseResizeObserverCallback>((entry) =>
    setMeasures({ width: entry.contentRect.width, height: entry.contentRect.height })
  );

  useResizeObserver(element, observerHandler, enabled);

  return [measures, elementRef];
}
