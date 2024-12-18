import {act, renderHook} from '@testing-library/react-hooks/dom';
import {useEffect} from 'react';
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useMeasure} from '../index.js';
import Mock = vi.Mock;

describe('useMeasure', () => {
	const raf = globalThis.requestAnimationFrame;
	const caf = globalThis.cancelAnimationFrame;
	const observeSpy = vi.fn();
	const unobserveSpy = vi.fn();
	const disconnectSpy = vi.fn();

	let ResizeObserverSpy: Mock<ResizeObserver>;
	const initialRO = globalThis.ResizeObserver;

	beforeAll(() => {
		vi.useFakeTimers();

		globalThis.requestAnimationFrame = cb => setTimeout(cb, 1);
		globalThis.cancelAnimationFrame = (cb) => {
			clearTimeout(cb);
		};

		ResizeObserverSpy = vi.fn(() => ({
			observe: observeSpy,
			unobserve: unobserveSpy,
			disconnect: disconnectSpy,
		}));

		globalThis.ResizeObserver = ResizeObserverSpy;
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
			const res = useMeasure<HTMLDivElement>();

			useEffect(() => {
				res[1].current = div;
			});

			return res;
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

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		ResizeObserverSpy.mock.calls[0][0]([entry]);
		expect(result.current[0]).toBeUndefined();

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(result.current[1]).toStrictEqual({current: div});
		expect(result.current[0]).toStrictEqual(measures);
	});
});
