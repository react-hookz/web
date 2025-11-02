import {act, renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useMap} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useMap', () => {
	it('should be defined', () => {
		expect(useMap).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMap());
		expect(result.error).toBeUndefined();
	});

	it('should return a Map instance with altered set, clear and delete methods', async () => {
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

	it('`set` should invoke original method and not rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'set');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap()] as const);
		const value = expectResultValue(result);

		await act(async () => {
			expect(value[1].set('foo', 'bar')).toBe(value[1]);
			expect(spy).toHaveBeenCalledWith('foo', 'bar');
		});

		expect(value[0]).toBe(1);

		spy.mockRestore();
	});

	it('`clear` should invoke original method and not rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'clear');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap()] as const);
		const value = expectResultValue(result);

		await act(async () => {
			value[1].clear();
		});

		expect(value[0]).toBe(1);

		spy.mockRestore();
	});

	it('`delete` should invoke original method and not rerender component', async () => {
		const spy = vi.spyOn(Map.prototype, 'delete');
		let i = 0;
		const {result} = await renderHook(() => [++i, useMap([['foo', 1]])] as const);
		const value = expectResultValue(result);

		await act(async () => {
			expect(value[1].delete('foo')).toBe(true);
			expect(spy).toHaveBeenCalledWith('foo');
		});

		expect(value[0]).toBe(1);

		spy.mockRestore();
	});
});
