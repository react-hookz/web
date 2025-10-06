import {act, renderHook} from '@ver0/react-hooks-testing';
import Cookies from 'js-cookie';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {expectResultValue} from '../util/testing/test-helpers.js';
import {useCookieValue} from './index.js';

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

	it('should be defined', async () => {
		expect(useCookieValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz'));
		expectResultValue(result);
	});

	it('should return cookie value on first render', async () => {
		Cookies.set('react-hookz', 'awesome');

		const {result} = await renderHook(() => useCookieValue('react-hookz'));
		expect(expectResultValue(result.all[0])[0]).toBe('awesome');

		Cookies.remove('react-hookz');
	});

	it('should return undefined on first render if `initializeWithValue` set to false', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz', {initializeWithValue: false}));
		expect(expectResultValue(result.all[0])[0]).toBeUndefined();
	});

	it('should return null if cookie not exists', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz'));
		const value = expectResultValue(result);
		expect(value[0]).toBe(null);
		expect(getSpy).toHaveBeenCalledWith('react-hookz');
	});

	it('should set the cookie value on call to `set`', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz'));

		let value = expectResultValue(result);
		expect(value[0]).toBe(null);
		await act(async () => {
			value = expectResultValue(result);
			value[1]('awesome');
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('awesome');
		expect(setSpy).toHaveBeenCalledWith('react-hookz', 'awesome', {});
		Cookies.remove('react-hookz');
	});

	it('should remove cookie value on call to `remove`', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz'));

		let value = expectResultValue(result);
		expect(value[0]).toBe(null);
		await act(async () => {
			value = expectResultValue(result);
			value[1]('awesome');
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('awesome');

		await act(async () => {
			value = expectResultValue(result);
			value[2]();
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(null);
		expect(removeSpy).toHaveBeenCalledWith('react-hookz', {});
		Cookies.remove('react-hookz');
	});

	it('should re-fetch cookie value on call to `fetch`', async () => {
		const {result} = await renderHook(() => useCookieValue('react-hookz'));

		Cookies.set('react-hookz', 'rulez');
		let value = expectResultValue(result);
		expect(value[0]).toBe(null);
		await act(async () => {
			value = expectResultValue(result);
			value[3]();
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('rulez');

		Cookies.remove('react-hookz');
	});

	it('should be synchronized between several hooks with the same key', async () => {
		const {result: result1} = await renderHook(() => useCookieValue('react-hookz'));
		const {result: result2} = await renderHook(() => useCookieValue('react-hookz'));

		let value1 = expectResultValue(result1);
		expect(value1[0]).toBe(null);
		let value2 = expectResultValue(result2);
		expect(value2[0]).toBe(null);

		await act(async () => {
			value1 = expectResultValue(result1);
			value1[1]('awesome');
		});

		value1 = expectResultValue(result1);
		expect(value1[0]).toBe('awesome');
		value2 = expectResultValue(result2);
		expect(value2[0]).toBe('awesome');

		await act(async () => {
			value2 = expectResultValue(result2);
			value2[2]();
		});

		value1 = expectResultValue(result1);
		expect(value1[0]).toBe(null);
		value2 = expectResultValue(result2);
		expect(value2[0]).toBe(null);
	});

	it('should return stable methods', async () => {
		const {result, rerender} = await renderHook(() => useCookieValue('react-hookz'));

		const result1 = expectResultValue(result);

		await rerender();

		const result2 = expectResultValue(result);
		expect(result1[1]).toBe(result2[1]);
		expect(result1[2]).toBe(result2[2]);
		expect(result1[3]).toBe(result2[3]);
	});
});
