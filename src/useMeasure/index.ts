import type {RefObject} from 'react';
import {useState} from 'react';
import {useHookableRef} from '../useHookableRef/index.js';
import {useRafCallback} from '../useRafCallback/index.js';
import type {UseResizeObserverCallback} from '../useResizeObserver/index.js';
import {useResizeObserver} from '../useResizeObserver/index.js';

export type Measures = {
	width: number;
	height: number;
};

export type Measurer = (entry: ResizeObserverEntry) => Measures;

/**
 * Measures an observed element by the `content-box` sizing model, excluding paddings and borders.
 *
 * Default measurer of `useMeasure`.
 */
export const contentBoxMeasurer: Measurer = (entry) => ({
	width: entry.contentRect.width,
	height: entry.contentRect.height,
});

/**
 * Measures an observed element by the `border-box` sizing model, including paddings and borders.
 *
 * Border box sizes are writing-mode relative, so `inlineSize` maps to width and `blockSize` to
 * height only in horizontal writing modes.
 */
export const borderBoxMeasurer: Measurer = (entry) => ({
	width: entry.borderBoxSize[0].inlineSize,
	height: entry.borderBoxSize[0].blockSize,
});

/**
 * Uses ResizeObserver to track element dimensions and re-render component when they change.
 *
 * @param enabled Whether resize observer is enabled or not.
 * @param measurer Derives measures from the observer entry, `contentBoxMeasurer` by default.
 */
export function useMeasure<T extends Element>(
	enabled = true,
	measurer: Measurer = contentBoxMeasurer,
): [Measures | undefined, RefObject<T | null>] {
	const [element, setElement] = useState<T | null>(null);
	const elementRef = useHookableRef<T | null>(null, (v) => {
		setElement(v);

		return v;
	});

	const [measures, setMeasures] = useState<Measures>();
	const [observerHandler] = useRafCallback<UseResizeObserverCallback>((entry) => {
		setMeasures(measurer(entry));
	});

	useResizeObserver(element, observerHandler, enabled);

	return [measures, elementRef];
}
