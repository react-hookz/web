import {act, renderHook} from '@ver0/react-hooks-testing';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import {useRerender} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useRerender', () => {
	it('should be defined', async () => {
		expect(useRerender).toBeDefined();
	});

	it('should return same function on each re-render', async () => {
		const {result, rerender} = await renderHook(() => useRerender());
		const fn1 = expectResultValue(result);
		await rerender();
		const fn2 = expectResultValue(result);
		await rerender();
		const fn3 = expectResultValue(result);

		expect(fn1).toBeInstanceOf(Function);
		expect(fn1).toBe(fn2);
		expect(fn2).toBe(fn3);
	});

	it('should rerender component on returned function invocation', async () => {
		const {result} = await renderHook(() => {
			const cnt = useRef(0);
			const rerender = useRerender();

			return [rerender, ++cnt.current] as const;
		});
		let value = expectResultValue(result);

		expect(value[1]).toBe(1);

		await act(async () => {
			// https://github.com/react-hookz/web/issues/691
			value[0]();
			value[0]();
		});
		value = expectResultValue(result);
		expect(value[1]).toBe(2);

		await act(async () => {
			value[0]();
			value[0]();
			value[0]();
		});
		value = expectResultValue(result);
		expect(value[1]).toBe(3);
	});
});
