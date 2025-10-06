import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
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

	it('should render', async () => {
		const {result} = await renderHook(() => useMeasure());
		expect(result.error).toBeUndefined();
	});

	it('should return undefined sate on initial render', async () => {
		const {result} = await renderHook(() => useMeasure());
		expect(result.error).toBeUndefined();

		const value = expectResultValue(result);
		expect(value[0]).toBeUndefined();
	});

	it('should return reference as a second array element', async () => {
		const {result} = await renderHook(() => useMeasure());
		expect(result.error).toBeUndefined();

		const value = expectResultValue(result);
		expect(value[1]).toStrictEqual({current: null});
	});
});
