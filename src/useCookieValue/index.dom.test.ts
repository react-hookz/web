import {act, renderHook} from '@testing-library/react-hooks/dom';
import Cookies from 'js-cookie';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useCookieValue, type UseCookieValueReturn} from './index.js';

describe('useCookieValue', () => {
	let getSpy = vi.spyOn(Cookies, 'get');
	let setSpy = vi.spyOn(Cookies, 'set');
	let removeSpy = vi.spyOn(Cookies, 'remove');

	beforeAll(() => {
		getSpy = vi.spyOn(Cookies, 'get');
		setSpy = vi.spyOn(Cookies, 'set');
		removeSpy = vi.spyOn(Cookies, 'remove');
	});

	afterAll(() => {
		getSpy.mockRestore();
		setSpy.mockRestore();
		removeSpy.mockRestore();
	});

	beforeEach(() => {
		getSpy.mockClear();
		setSpy.mockClear();
		removeSpy.mockClear();
	});

	it('should be defined', () => {
		expect(useCookieValue).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));
		expect(result.error).toBeUndefined();
	});

	it('should return cookie value on first render', () => {
		Cookies.set('react-hookz', 'awesome');

		const {result} = renderHook(() => useCookieValue('react-hookz'));
		expect((result.all[0] as UseCookieValueReturn)[0]).toBe('awesome');

		Cookies.remove('react-hookz');
	});

	it('should return undefined on first render if `initializeWithValue` set to false', () => {
		const {result} = renderHook(() =>
			useCookieValue('react-hookz', {initializeWithValue: false}));
		expect((result.all[0] as UseCookieValueReturn)[0]).toBeUndefined();
	});

	it('should return null if cookie not exists', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));
		expect(result.current[0]).toBe(null);
		expect(getSpy).toHaveBeenCalledWith('react-hookz');
	});

	it('should set the cookie value on call to `set`', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));

		expect(result.current[0]).toBe(null);
		act(() => {
			result.current[1]('awesome');
		});
		expect(result.current[0]).toBe('awesome');
		expect(setSpy).toHaveBeenCalledWith('react-hookz', 'awesome', {});
		Cookies.remove('react-hookz');
	});

	it('should remove cookie value on call to `remove`', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));

		expect(result.current[0]).toBe(null);
		act(() => {
			result.current[1]('awesome');
		});
		expect(result.current[0]).toBe('awesome');

		act(() => {
			result.current[2]();
		});
		expect(result.current[0]).toBe(null);
		expect(removeSpy).toHaveBeenCalledWith('react-hookz', {});
		Cookies.remove('react-hookz');
	});

	it('should re-fetch cookie value on call to `fetch`', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));

		Cookies.set('react-hookz', 'rulez');
		expect(result.current[0]).toBe(null);
		act(() => {
			result.current[3]();
		});
		expect(result.current[0]).toBe('rulez');

		Cookies.remove('react-hookz');
	});

	it('should be synchronized between several hooks with the same key', () => {
		const {result: result1} = renderHook(() => useCookieValue('react-hookz'));
		const {result: result2} = renderHook(() => useCookieValue('react-hookz'));

		expect(result1.current[0]).toBe(null);
		expect(result2.current[0]).toBe(null);

		act(() => {
			result1.current[1]('awesome');
		});

		expect(result1.current[0]).toBe('awesome');
		expect(result2.current[0]).toBe('awesome');

		act(() => {
			result2.current[2]();
		});

		expect(result1.current[0]).toBe(null);
		expect(result2.current[0]).toBe(null);
	});

	it('should return stable methods', () => {
		const {result, rerender} = renderHook(() => useCookieValue('react-hookz'));

		const result1 = result.current;

		rerender();

		expect(result1[1]).toBe(result.current[1]);
		expect(result1[2]).toBe(result.current[2]);
		expect(result1[3]).toBe(result.current[3]);
	});
});
