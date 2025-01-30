import {type MutableRefObject, useState} from 'react';
import {useHookableRef} from '../useHookableRef/index.js';
import {useRafCallback} from '../useRafCallback/index.js';
import {useResizeObserver, type UseResizeObserverCallback} from '../useResizeObserver/index.js';

export type Measures = {
	width: number;
	height: number;
};

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 * @param observerEntryMatcher A custom matcher function to define the measures. If returns `null` - default `contentRect` measures are applied
 */
export function useMeasure<T extends Element>(
	enabled = true,
	observerEntryMatcher?: (entry: ResizeObserverEntry) => Measures | null,
): [Measures | undefined, MutableRefObject<T | null>] {
	const [element, setElement] = useState<T | null>(null);
	const elementRef = useHookableRef<T | null>(null, (v) => {
		setElement(v);

		return v;
	});

	const [measures, setMeasures] = useState<Measures>();
	const [observerHandler] = useRafCallback<UseResizeObserverCallback>((entry) => {
		const defaultMeasures: Measures = {
			width: entry.contentRect.width,
			height: entry.contentRect.height,
		};

		if (observerEntryMatcher) {
			const matcherMeasures = observerEntryMatcher(entry);

			setMeasures(matcherMeasures ?? defaultMeasures);
			return;
		}

		setMeasures({width: entry.contentRect.width, height: entry.contentRect.height});
	});

	useResizeObserver(element, observerHandler, enabled);

	return [measures, elementRef];
}
