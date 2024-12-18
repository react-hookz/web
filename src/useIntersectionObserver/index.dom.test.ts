import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeAll, beforeEach, describe, expect, it, type Mock, vi} from 'vitest';
import {useIntersectionObserver} from '../index.js';

describe('useIntersectionObserver', () => {
	let IntersectionObserverSpy: Mock<IntersectionObserver>;
	const initialRO = globalThis.ResizeObserver;

	beforeAll(() => {
		IntersectionObserverSpy = vi.fn(() => ({
			observe: vi.fn(),
			unobserve: vi.fn(),
			disconnect: vi.fn(),
			takeRecords: () => [],
			root: document,
			rootMargin: '0px',
			thresholds: [0],
		}));

		globalThis.IntersectionObserver = IntersectionObserverSpy;
		vi.useFakeTimers();
	});

	beforeEach(() => {
		IntersectionObserverSpy.mockClear();
	});

	afterAll(() => {
		globalThis.ResizeObserver = initialRO;
		vi.useRealTimers();
	});

	it('should be defined', () => {
		expect(useIntersectionObserver).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useIntersectionObserver(null));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', () => {
		const div1 = document.createElement('div');
		const {result} = renderHook(() => useIntersectionObserver(div1));
		expect(result.current).toBeUndefined();
	});

	it('should create IntersectionObserver instance only for unique set of options', () => {
		expect(IntersectionObserverSpy).toHaveBeenCalledTimes(0);
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');

		renderHook(() => useIntersectionObserver(div1));
		renderHook(() => useIntersectionObserver(div2));

		expect(IntersectionObserverSpy).toHaveBeenCalledTimes(1);
	});

	it('should return intersection entry', () => {
		const div1 = document.createElement('div');
		const div1Ref = {current: div1};
		const div2 = document.createElement('div');

		const {result: res1} = renderHook(() => useIntersectionObserver(div1Ref));
		const {result: res2, unmount} = renderHook(() =>
			useIntersectionObserver(div2, {threshold: [0, 1]}));

		expect(res1.current).toBeUndefined();
		expect(res2.current).toBeUndefined();

		const entry1 = {target: div1};
		const entry2 = {target: div2};

		act(() => {
			IntersectionObserverSpy.mock.calls[0][0]([entry1]);

			IntersectionObserverSpy.mock.calls[1][0]([entry2]);
			vi.advanceTimersByTime(1);
		});

		expect(res1.current).toBe(entry1);
		expect(res2.current).toBe(entry2);

		unmount();

		const entry3 = {target: div1};
		act(() => {
			IntersectionObserverSpy.mock.calls[0][0]([entry3]);
			vi.advanceTimersByTime(1);
		});

		expect(res1.current).toBe(entry3);
	});

	it('two hooks observing same target should use single observer', () => {
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');

		const {result: res1} = renderHook(() =>
			useIntersectionObserver(div1, {root: {current: div2}}));
		const {result: res2} = renderHook(() =>
			useIntersectionObserver(div1, {root: {current: div2}}));

		expect(res1.current).toBeUndefined();
		expect(res2.current).toBeUndefined();

		const entry1 = {target: div1};

		act(() => {
			IntersectionObserverSpy.mock.calls[0][0]([entry1]);
			vi.advanceTimersByTime(1);
		});

		expect(res1.current).toBe(entry1);
		expect(res2.current).toBe(entry1);
	});

	it('should disconnect observer if last hook unmounted', () => {
		const div1 = document.createElement('div');

		const {result, unmount} = renderHook(() => useIntersectionObserver(div1));
		const entry1 = {target: div1};

		act(() => {
			IntersectionObserverSpy.mock.calls[0][0]([entry1]);
			vi.advanceTimersByTime(1);
		});

		expect(result.current).toBe(entry1);

		unmount();
		expect(IntersectionObserverSpy.mock.results[0].value.disconnect).toHaveBeenCalled();
	});
});
