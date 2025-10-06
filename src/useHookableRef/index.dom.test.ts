import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useHookableRef} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useHookableRef', () => {
	it('should be defined', async () => {
		expect(useHookableRef).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useHookableRef());
		expect(result.error).toBeUndefined();
	});

	it('should return ref object with initial value', async () => {
		const {result} = await renderHook(() => useHookableRef(123));
		const value = expectResultValue(result);
		expect(value).toEqual({current: 123});
	});

	it('should persist same reference between re-renders', async () => {
		const {result, rerender} = await renderHook(() => useHookableRef(123));
		let value = expectResultValue(result);
		const firstResult = value;
		await rerender();
		value = expectResultValue(result);
		expect(value).toBe(firstResult);
		await rerender();
		value = expectResultValue(result);
		expect(value).toBe(firstResult);
	});

	it('should call getter and setter hook', async () => {
		const getter = vi.fn((v: number) => v);
		const setter = vi.fn((v: number) => v);

		const {result} = await renderHook(() => useHookableRef(123, setter, getter));
		const value = expectResultValue(result);

		expect(getter).not.toHaveBeenCalled();
		expect(setter).not.toHaveBeenCalled();

		expect(value.current).toBe(123);
		expect(getter).toHaveBeenCalledTimes(1);

		value.current = 321;
		expect(value.current).toBe(321);
		expect(getter).toHaveBeenCalledTimes(2);
		expect(setter).toHaveBeenCalledTimes(1);
	});

	it('should work properly without getter and setter', async () => {
		const {result} = await renderHook(() => useHookableRef(123));
		const value = expectResultValue(result);
		expect(value.current).toBe(123);

		value.current = 321;
		expect(value.current).toBe(321);
	});
});
