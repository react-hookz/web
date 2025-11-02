import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useMap} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useMap', () => {
	it('should be defined', async () => {
		expect(useMap).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMap());
		expectResultValue(result);
	});

	it('should return a Map instance with altered add, clear and delete methods', async () => {
		const {result} = await renderHook(() => useMap());
		const value = expectResultValue(result);
		expect(value).toBeInstanceOf(Map);
		expect(value.set).not.toBe(Map.prototype.set);
		expect(value.clear).not.toBe(Map.prototype.clear);
		expect(value.delete).not.toBe(Map.prototype.delete);
	});

	it('should accept initial values', async () => {
		const {result} = await renderHook(() =>
			useMap([
				['foo', 1],
				['bar', 2],
				['baz', 3],
			]),
		);
		const value = expectResultValue(result);
		expect(value.get('foo')).toBe(1);
		expect(value.get('bar')).toBe(2);
		expect(value.get('baz')).toBe(3);
		expect(value.size).toBe(3);
	});

	it('`set` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'set');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap()] as const);
		const initialValue = expectResultValue(result);

		await act(async () => {
			expect(initialValue[1].set('foo', 'bar')).toBe(initialValue[1]);
			expect(spy).toHaveBeenCalledWith('foo', 'bar');
		});

		const updatedValue = expectResultValue(result);
		expect(updatedValue[0]).toBe(2);

		spy.mockRestore();
	});

	it('`clear` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'clear');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap()] as const);
		const initialValue = expectResultValue(result);

		await act(async () => {
			initialValue[1].clear();
		});

		const updatedValue = expectResultValue(result);
		expect(updatedValue[0]).toBe(2);

		spy.mockRestore();
	});

	it('`delete` should invoke original method and rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'delete');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap([['foo', 1]])] as const);
		const initialValue = expectResultValue(result);

		await act(async () => {
			expect(initialValue[1].delete('foo')).toBe(true);
			expect(spy).toHaveBeenCalledWith('foo');
		});

		const updatedValue = expectResultValue(result);
		expect(updatedValue[0]).toBe(2);

		spy.mockRestore();
	});
});
