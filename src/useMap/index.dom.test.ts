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

	it.each([0, Number.NaN, undefined, {count: 0}])('does not rerender when setting the same value %s', async (value) => {
		let renders = 0;
		const {result} = await renderHook(() => [++renders, useMap<string, unknown>([['key', value]])] as const);
		const [, map] = expectResultValue(result);

		await act(async () => {
			expect(map.set('key', value)).toBe(map);
		});

		expect(expectResultValue(result)[0]).toBe(1);
		expect(map.has('key')).toBe(true);
		expect(map.get('key')).toBe(value);
	});

	it.each([
		[0, 1],
		[0, -0],
		[-0, 0],
		[{count: 0}, {count: 0}],
	])('rerenders when changing a value from %s to %s', async (before, after) => {
		let renders = 0;
		const {result} = await renderHook(() => [++renders, useMap<string, unknown>([['key', before]])] as const);
		const [, map] = expectResultValue(result);

		await act(async () => {
			expect(map.set('key', after)).toBe(map);
		});

		expect(expectResultValue(result)[0]).toBe(2);
		expect(map.get('key')).toBe(after);
	});

	it('inserts a missing key with an undefined value and rerenders', async () => {
		let renders = 0;
		const {result} = await renderHook(() => [++renders, useMap<string, undefined>()] as const);
		const [, map] = expectResultValue(result);

		await act(async () => {
			expect(map.set('key', undefined)).toBe(map);
		});

		expect(expectResultValue(result)[0]).toBe(2);
		expect(map.has('key')).toBe(true);
		expect(map.size).toBe(1);
	});
});
