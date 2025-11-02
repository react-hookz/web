import {act, renderHook} from '@ver0/react-hooks-testing';
import {useEffect} from 'react';
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useMeasure} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

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

		globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 1);
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

	it('should be defined', async () => {
		expect(useMeasure).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMeasure());

		expect(result.error).toBeUndefined();
	});

	it('should return undefined sate on initial render', async () => {
		const {result} = await renderHook(() => useMeasure());

		const value = expectResultValue(result);
		expect(value[0]).toBeUndefined();
	});

	it('should return reference as a second array element', async () => {
		const {result} = await renderHook(() => useMeasure());

		const value = expectResultValue(result);
		expect(value[1]).toStrictEqual({current: null});
	});

	it('should only set state within animation frame', async () => {
		const div = document.createElement('div');
		const {result} = await renderHook(() => {
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

		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const entry = {
			target: div,
			contentRect: {width: 0, height: 0},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry]);
		let value = expectResultValue(result);
		expect(value[0]).toBeUndefined();

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		value = expectResultValue(result);
		expect(value[1]).toStrictEqual({current: div});
		expect(value[0]).toStrictEqual(measures);
	});
});
