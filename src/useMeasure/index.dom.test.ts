import {act, renderHook} from '@testing-library/react-hooks/dom';
import {useEffect} from 'react';
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useMeasure} from '../index.js';

describe('useMeasure', () => {
	const observeSpy = vi.fn();
	const unobserveSpy = vi.fn();
	const disconnectSpy = vi.fn();

	const ResizeObserverSpy = vi.fn((_cb: (entries: ResizeObserverEntry[]) => void) => ({
		observe: observeSpy,
		unobserve: unobserveSpy,
		disconnect: disconnectSpy,
	}));
	const initialRO = globalThis.ResizeObserver;

	const raf = globalThis.requestAnimationFrame;
	const caf = globalThis.cancelAnimationFrame;

	beforeAll(() => {
		vi.useFakeTimers();

		globalThis.requestAnimationFrame = cb => setTimeout(cb, 1);
		globalThis.cancelAnimationFrame = (cb) => {
			clearTimeout(cb);
		};

		vi.stubGlobal('ResizeObserver', ResizeObserverSpy);
	});

	beforeEach(() => {
		observeSpy.mockClear();
		unobserveSpy.mockClear();
		disconnectSpy.mockClear();
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();

		globalThis.ResizeObserver = initialRO;

		globalThis.requestAnimationFrame = raf;
		globalThis.cancelAnimationFrame = caf;
	});

	it('should be defined', () => {
		expect(useMeasure).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useMeasure());

		expect(result.error).toBeUndefined();
	});

	it('should return undefined sate on initial render', () => {
		const {result} = renderHook(() => useMeasure());

		expect(result.current[0]).toBeUndefined();
	});

	it('should return reference as a second array element', () => {
		const {result} = renderHook(() => useMeasure());

		expect(result.current[1]).toStrictEqual({current: null});
	});

	it('should only set state within animation frame', () => {
		const div = document.createElement('div');
		const {result} = renderHook(() => {
			const measure = useMeasure<HTMLDivElement>();

			useEffect(() => {
				measure[1].current = div;
			});

			return measure;
		});

		const measures = {
			width: 0,
			height: 0,
		};

		const entry = {
			target: div,
			contentRect: {width: 0, height: 0},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry]);
		expect(result.current[0]).toBeUndefined();

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(result.current[1]).toStrictEqual({current: div});
		expect(result.current[0]).toStrictEqual(measures);
	});

	it('should set state by observerEntryMatcher parameter', () => {
		const div = document.createElement('div');
		const {result} = renderHook(() => {
			const measure = useMeasure<HTMLDivElement>(true, (entry) => {
				if (!entry.borderBoxSize?.length) {
					return null;
				}

				return {
					height: entry.borderBoxSize[0].blockSize,
					width: entry.borderBoxSize[0].inlineSize,
				};
			});

			useEffect(() => {
				measure[1].current = div;
			});

			return measure;
		});

		const measures = {
			width: 9,
			height: 9,
		};

		const entry = {
			target: div,
			contentRect: {width: 5, height: 5},
			borderBoxSize: [{
				blockSize: 9,
				inlineSize: 9,
			}],
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry]);
		expect(result.current[0]).toBeUndefined();

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(result.current[1]).toStrictEqual({current: div});
		expect(result.current[0]).toStrictEqual(measures);
	});
});
