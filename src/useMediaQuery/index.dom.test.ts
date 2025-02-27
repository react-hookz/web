import {act, renderHook} from '@testing-library/react-hooks/dom';
import {type Mock, afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useMediaQuery} from '../index.js';

type MatchMediaMock = MediaQueryList & {
	matches: boolean;
	addEventListener: Mock;
	removeEventListener: Mock;
	dispatchEvent: Mock;
};

describe('useMediaQuery', () => {
	const matchMediaMock = vi.fn(
		(query: string) =>
			(query === '(orientation: unsupported)' ?
				undefined :
					{
						matches: false,
						media: query,
						onchange: null,
						addEventListener: vi.fn(),
						removeEventListener: vi.fn(),
						dispatchEvent: vi.fn(),
					}) as unknown as MatchMediaMock,
	);

	vi.stubGlobal('matchMedia', matchMediaMock);

	beforeEach(() => {
		matchMediaMock.mockClear();
	});
	afterEach(() => {
		matchMediaMock.mockClear();
	});

	it('should be defined', () => {
		expect(useMediaQuery).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined and not thrown on unsupported when not enabled', () => {
		const spy = vi.fn();
		vi.stubGlobal('console', {
			error: spy,
		});
		const {result, rerender, unmount} = renderHook(() => useMediaQuery('max-width : 768px', {enabled: false}));
		const {result: result2, rerender: rerender2, unmount: unmount2} = renderHook(() => useMediaQuery('(orientation: unsupported)', {enabled: false}));
		expect(spy.call.length === 0 || !spy.mock.calls.some((call: string[]) => call[0]?.includes?.('error: matchMedia'))).toBe(true);
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		expect(result2.error).toBeUndefined();
		expect(result2.current).toBe(undefined);
		rerender('max-width : 768px');
		rerender2('(orientation: unsupported)');
		expect(spy.call.length === 0 || !spy.mock.calls.some((call: string[]) => call[0]?.includes?.('error: matchMedia'))).toBe(true);
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		expect(result2.current).toBe(undefined);
		expect(result2.error).toBeUndefined();
		unmount();
		unmount2();
		expect(spy.call.length === 0 || !spy.mock.calls.some((call: string[]) => call[0]?.includes?.('error: matchMedia'))).toBe(true);
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		expect(result2.error).toBeUndefined();
		expect(result2.current).toBe(undefined);
		vi.unstubAllGlobals();
		vi.stubGlobal('matchMedia', matchMediaMock);
	});

	it('should return undefined on first render, if initializeWithValue is false', () => {
		const {result} = renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.all.length).toBe(2);
		expect(result.all[0]).toBe(undefined);
		expect(result.current).toBe(false);
	});

	it('should return value on first render, if initializeWithValue is true', () => {
		const {result} = renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: true}));
		expect(result.all.length).toBe(1);
		expect(result.current).toBe(false);
	});

	it('should return match state', () => {
		const {result} = renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.current).toBe(false);
	});

	it('should update state if query state changed', () => {
		const {result} = renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result.current).toBe(false);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result.current).toBe(true);
	});

	it('several hooks tracking same rule must listen same mql', () => {
		const {result: result1} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result2} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result3} = renderHook(() => useMediaQuery('max-width : 768px'));
		expect(result1.current).toBe(false);
		expect(result2.current).toBe(false);
		expect(result3.current).toBe(false);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result1.current).toBe(true);
		expect(result2.current).toBe(true);
		expect(result3.current).toBe(true);
	});

	it('should unsubscribe from previous mql when query changed', () => {
		const {result: result1} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result2} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {result: result3, rerender: rerender3} = renderHook(({query}) => useMediaQuery(query), {
			initialProps: {query: 'max-width : 768px'},
		});
		expect(result1.current).toBe(false);
		expect(result2.current).toBe(false);
		expect(result3.current).toBe(false);

		rerender3({query: 'max-width : 760px'});

		expect(matchMediaMock).toHaveBeenCalledTimes(2);

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});
		expect(result1.current).toBe(true);
		expect(result2.current).toBe(true);
		expect(result3.current).toBe(false);
	});

	it('should unsubscribe from mql only when no hooks are awaiting such value', () => {
		const {unmount: unmount1} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {unmount: unmount2} = renderHook(() => useMediaQuery('max-width : 768px'));
		const {unmount: unmount3} = renderHook(() => useMediaQuery('max-width : 768px'));

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		unmount3();
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		unmount2();
		expect(mql.removeEventListener).not.toHaveBeenCalled();
		unmount1();
		expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
	});

	it('should not throw when media query is not supported', () => {
		const spy = vi.fn();
		vi.stubGlobal('console', {
			error: spy,
		});
		const {result, unmount, rerender} = renderHook(() => useMediaQuery('(orientation: unsupported)', {initializeWithValue: true}));
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls.some((call: string[]) => call[0]?.includes?.('error: matchMedia'))).toBe(true);
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		rerender();
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		unmount();
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(undefined);
		vi.unstubAllGlobals();
		vi.stubGlobal('matchMedia', matchMediaMock);
	});
});
