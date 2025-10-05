import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useIntersectionObserver} from '../index.js';

describe('useIntersectionObserver', () => {
	const IntersectionObserverMock = vi.fn((_cb: (entries: IntersectionObserverEntry[]) => void) => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
		takeRecords: () => [],
		root: document,
		rootMargin: '0px',
		thresholds: [0],
	}));
	vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

	beforeEach(() => {
		IntersectionObserverMock.mockClear();
	});

	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
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

	it('should create IntersectionObserver instance only for unique set of options', async () => {
		expect(IntersectionObserverMock).toHaveBeenCalledTimes(0);

		renderHook(() => useIntersectionObserver(document.createElement('div')));
		renderHook(() => useIntersectionObserver(document.createElement('div')));

		expect(IntersectionObserverMock).toHaveBeenCalledTimes(1);
	});

	it('should return intersection entry', () => {
		const div1 = document.createElement('div');
		const div1Ref = {current: div1};
		const div2 = document.createElement('div');

		const hook1 = renderHook(() => useIntersectionObserver(div1Ref));
		const hook2 = renderHook(() =>
			useIntersectionObserver(div2, {threshold: [0, 1]}));

		expect(hook1.result.current).toBeUndefined();
		expect(hook2.result.current).toBeUndefined();

		const entry1 = {target: div1} as unknown as IntersectionObserverEntry;
		const entry2 = {target: div2} as unknown as IntersectionObserverEntry;

		act(() => {
			IntersectionObserverMock.mock.calls[0][0]([entry1]);
			IntersectionObserverMock.mock.calls[1][0]([entry2]);
			vi.advanceTimersByTime(1);
		});

		expect(hook1.result.current).toBe(entry1);
		expect(hook2.result.current).toBe(entry2);

		hook2.unmount();

		const entry3 = {target: div1} as unknown as IntersectionObserverEntry;
		act(() => {
			IntersectionObserverMock.mock.calls[0][0]([entry3]);
			vi.advanceTimersByTime(1);
		});

		expect(hook1.result.current).toBe(entry3);
	});

	it('two hooks observing same target should use single observer', () => {
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');

		const hook1 = renderHook(() =>
			useIntersectionObserver(div1, {root: {current: div2}}));
		const hook2 = renderHook(() =>
			useIntersectionObserver(div1, {root: {current: div2}}));

		expect(hook1.result.current).toBeUndefined();
		expect(hook2.result.current).toBeUndefined();

		const entry1 = {target: div1} as unknown as IntersectionObserverEntry;

		act(() => {
			IntersectionObserverMock.mock.calls[0][0]([entry1]);
			vi.advanceTimersByTime(1);
		});

		expect(hook1.result.current).toBe(entry1);
		expect(hook2.result.current).toBe(entry1);
	});

	it('should disconnect observer if last hook unmounted', () => {
		const div1 = document.createElement('div');

		const {result, unmount} = renderHook(() => useIntersectionObserver(div1));
		const entry1 = {target: div1} as unknown as IntersectionObserverEntry;

		act(() => {
			IntersectionObserverMock.mock.calls[0][0]([entry1]);
			vi.advanceTimersByTime(1);
		});

		expect(result.current).toBe(entry1);

		unmount();
		expect(IntersectionObserverMock.mock.results[0].value.disconnect).toHaveBeenCalled();
	});
});
