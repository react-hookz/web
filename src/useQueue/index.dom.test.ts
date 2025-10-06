import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useQueue} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useQueue', () => {
	it('should be defined', async () => {
		expect(useQueue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useQueue());
		expect(result.error).toBeUndefined();
	});

	it('should accept an initial value', async () => {
		const {result} = await renderHook(() => useQueue([0, 1, 2, 3]));
		const value = expectResultValue(result);
		expect(value.items).toStrictEqual([0, 1, 2, 3]);
	});

	it('should remove the first value', async () => {
		const {result} = await renderHook(() => useQueue([0, 1, 2, 3]));
		let value = expectResultValue(result);

		await act(async () => {
			const removed = value.remove();
			expect(removed).toBe(0);
		});

		value = expectResultValue(result);
		expect(value.first).toBe(1);
	});

	it('should return the length', async () => {
		const {result} = await renderHook(() => useQueue([0, 1, 2, 3]));
		const value = expectResultValue(result);
		expect(value.size).toBe(4);
	});

	it('should add a value to the end', async () => {
		const {result} = await renderHook(() => useQueue([0, 1, 2, 3]));
		let value = expectResultValue(result);

		await act(async () => {
			value.add(4);
		});

		value = expectResultValue(result);
		expect(value.last).toBe(4);
	});

	it('should return referentially stable functions', async () => {
		const {result} = await renderHook(() => useQueue([0, 1, 2, 3]));
		let value = expectResultValue(result);

		const remove1 = value.remove;
		const add1 = value.add;

		await act(async () => {
			value.add(1);
			value.remove();
		});

		value = expectResultValue(result);
		expect(value.remove).toBe(remove1);
		expect(value.add).toBe(add1);
	});
});
