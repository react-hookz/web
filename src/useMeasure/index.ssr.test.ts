import {renderHook} from '@testing-library/react-hooks/server';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
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

	beforeAll(() => {
		vi.stubGlobal('ResizeObserver', ResizeObserverSpy);
		vi.useFakeTimers();
	});

	beforeEach(() => {
		observeSpy.mockClear();
		unobserveSpy.mockClear();
		disconnectSpy.mockClear();
	});

	afterAll(() => {
		globalThis.ResizeObserver = initialRO;
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
});
