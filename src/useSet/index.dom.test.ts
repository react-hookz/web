import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useSet} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useSet', () => {
	it('should be defined', async () => {
		expect(useSet).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useSet());
		expectResultValue(result);
	});

	it('should return a Set instance with altered add, clear and delete methods', async () => {
		const {result} = await renderHook(() => useSet());
		const value = expectResultValue(result);
		expect(value).toBeInstanceOf(Set);
		expect(value.add).not.toBe(Set.prototype.add);
		expect(value.clear).not.toBe(Set.prototype.clear);
		expect(value.delete).not.toBe(Set.prototype.delete);
	});

	it('should accept initial values', async () => {
		const {result} = await renderHook(() => useSet([1, 2, 3]));
		const value = expectResultValue(result);
		expect(value.has(1)).toBe(true);
		expect(value.has(2)).toBe(true);
		expect(value.has(3)).toBe(true);
		expect(value.size).toBe(3);
	});

	it('`add` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Set.prototype, 'add');
		let i = 0;
		const {result} = await renderHook(() => [++i, useSet()] as const);
		let value = expectResultValue(result);

		await act(async () => {
			expect(value[1].add(1)).toBe(value[1]);
			expect(spy).toHaveBeenCalledWith(1);
		});

		value = expectResultValue(result);
		expect(value[0]).toBe(2);

		spy.mockRestore();
	});

	it('`clear` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Set.prototype, 'clear');
		let i = 0;
		const {result} = await renderHook(() => [++i, useSet()] as const);
		let value = expectResultValue(result);

		await act(async () => {
			value[1].clear();
		});

		value = expectResultValue(result);
		expect(value[0]).toBe(2);

		spy.mockRestore();
	});

	it('`delete` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Set.prototype, 'delete');
		let i = 0;
		const {result} = await renderHook(() => [++i, useSet([1])] as const);
		let value = expectResultValue(result);

		await act(async () => {
			expect(value[1].delete(1)).toBe(true);
			expect(spy).toHaveBeenCalledWith(1);
		});

		value = expectResultValue(result);
		expect(value[0]).toBe(2);

		spy.mockRestore();
	});
});
