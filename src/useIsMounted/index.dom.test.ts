import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useIsMounted} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useIsMounted', () => {
	it('should be defined', async () => {
		expect(useIsMounted).toBeDefined();
	});

	it('should return a function', async () => {
		const {result} = await renderHook(() => useIsMounted());

		const value = expectResultValue(result);
		expect(value).toBeInstanceOf(Function);
	});

	it('should return false within first render', async () => {
		const {result} = await renderHook(() => {
			const isMounted = useIsMounted();
			return isMounted();
		});

		const value = expectResultValue(result);
		expect(value).toBe(false);
	});

	it('should return true after mount', async () => {
		const {result} = await renderHook(() => useIsMounted());

		const value = expectResultValue(result);
		expect(value()).toBe(true);
	});

	it('should return same function on each render', async () => {
		const {result, rerender} = await renderHook(() => useIsMounted());

		const fn1 = expectResultValue(result);
		await rerender();
		const fn2 = expectResultValue(result);
		await rerender();
		const fn3 = expectResultValue(result);

		expect(fn1).toBe(fn2);
		expect(fn2).toBe(fn3);
	});

	it('should return false after component unmount', async () => {
		const {result, unmount} = await renderHook(() => useIsMounted());

		const value = expectResultValue(result);
		expect(value()).toBe(true);

		await unmount();

		const valueAfterUnmount = expectResultValue(result);
		expect(valueAfterUnmount()).toBe(false);
	});
});
