import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useMediaQuery} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useMediaQuery', () => {
	const matchMediaMock = vi.fn((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));

	vi.stubGlobal('matchMedia', matchMediaMock);

	beforeEach(() => {
		matchMediaMock.mockClear();
	});
	afterEach(() => {
		matchMediaMock.mockClear();
	});

	it('should be defined', async () => {
		expect(useMediaQuery).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render, if initializeWithValue is false', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.all.length).toBe(2);
		expect(expectResultValue(result.all[0])).toBe(undefined);
		expect(result.value).toBe(false);
	});

	it('should return value on first render, if initializeWithValue is true', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: true}));
		expect(result.all.length).toBe(1);
		expect(result.value).toBe(false);
	});

	it('should return match state', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.value).toBe(false);
	});

	it('should update state if query state changed', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.value).toBe(false);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result.value).toBe(true);
	});

	it('several hooks tracking same rule must listen same mql', async () => {
		const {result: result1} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result2} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result3} = await renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result1.value).toBe(false);
		expect(result2.value).toBe(false);
		expect(result3.value).toBe(false);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result1.value).toBe(true);
		expect(result2.value).toBe(true);
		expect(result3.value).toBe(true);
	});

	it('should unsubscribe from previous mql when query changed', async () => {
		const {result: result1} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result2} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result3, rerender: rerender3} = await renderHook(({query}) => useMediaQuery(query), {
			initialProps: {query: 'max-width : 768px'},
		});
		expect(result1.value).toBe(false);
		expect(result2.value).toBe(false);
		expect(result3.value).toBe(false);

		await rerender3({query: 'max-width : 760px'});

		expect(matchMediaMock).toHaveBeenCalledTimes(2);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result1.value).toBe(true);
		expect(result2.value).toBe(true);
		expect(result3.value).toBe(false);
	});

	it('should unsubscribe from mql only when no hooks are awaiting such value', async () => {
		const {unmount: unmount1} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {unmount: unmount2} = await renderHook(() => useMediaQuery('max-width : 768px'));
		const {unmount: unmount3} = await renderHook(() => useMediaQuery('max-width : 768px'));

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		await unmount3();
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		await unmount2();
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		await unmount1();
		expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
	});
});
