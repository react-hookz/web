import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useCounter} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useCounter', () => {
	it('should be defined', async () => {
		expect(useCounter).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useCounter());
		expect(result.error).toBeUndefined();
	});

	it('should have default initial value of 0', async () => {
		const {result} = await renderHook(() => useCounter());
		const value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(0);
	});

	it('should accept custom initial value', async () => {
		const {result} = await renderHook(() => useCounter(5));
		const value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(5);
	});

	it('should accept function returning a number as initial value', async () => {
		const {result} = await renderHook(() => useCounter(() => 5));
		const value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(5);
	});

	it('should force initial value to be at least the given minimum value', async () => {
		const {result} = await renderHook(() => useCounter(0, 10, 5));
		const value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(5);
	});

	it('should force initial value to be at most the given maximum value', async () => {
		const {result} = await renderHook(() => useCounter(10, 5));
		const value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(5);
	});

	it('get returns the current counter value', async () => {
		const {result} = await renderHook(() => useCounter(0));
		const value = expectResultValue(result);
		const {get} = value[1];

		await act(async () => {
			expect(get()).toEqual(value[0]);
		});
	});

	it('set sets the counter to any value', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {set} = value[1];

		await act(async () => {
			set(2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(2);

		await act(async () => {
			set((current: number) => current + 5);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(7);

		await act(async () => {
			set(12);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(12);
	});

	it('set respects min and max parameters', async () => {
		const {result} = await renderHook(() => useCounter(0, 10, 0));
		let value = expectResultValue(result);
		const {set} = value[1];

		await act(async () => {
			set(-2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);

		await act(async () => {
			set(12);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(10);
	});

	it('inc increments the counter by 1 if no delta given', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {inc} = value[1];

		await act(async () => {
			inc();
		});

		value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(1);
	});

	it('inc increments the counter by the given delta', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {inc} = value[1];

		await act(async () => {
			inc(2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(2);

		await act(async () => {
			inc((current) => current + 1);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(5);
	});

	it('inc respects min and max parameters', async () => {
		const {result} = await renderHook(() => useCounter(0, 5, 0));
		let value = expectResultValue(result);
		const {inc} = value[1];

		await act(async () => {
			inc(-2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);

		await act(async () => {
			inc(12);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(5);
	});

	it('dec decrements the counter by 1 if no delta given', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {dec} = value[1];

		await act(async () => {
			dec();
		});

		value = expectResultValue(result);
		const counter = value[0];
		expect(counter).toEqual(-1);
	});

	it('dec decrements the counter by the given delta', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {dec} = value[1];

		await act(async () => {
			dec(2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(-2);

		await act(async () => {
			dec((current) => current + 1);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(-1);
	});

	it('dec respects min and max parameters', async () => {
		const {result} = await renderHook(() => useCounter(0, 5, 0));
		let value = expectResultValue(result);
		const {dec} = value[1];

		await act(async () => {
			dec(2);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);

		await act(async () => {
			dec(-12);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(5);
	});

	it('reset without arguments sets the counter to its initial value', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {reset, inc} = value[1];

		await act(async () => {
			inc();
			reset();
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);
	});

	it('reset with argument sets the counter to its new initial value', async () => {
		const {result} = await renderHook(() => useCounter(0));
		let value = expectResultValue(result);
		const {reset, inc} = value[1];

		await act(async () => {
			inc();
			reset(5);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(5);

		await act(async () => {
			inc();
			reset();
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);
	});

	it('reset respects min and max parameters', async () => {
		const {result} = await renderHook(() => useCounter(0, 10, 0));
		let value = expectResultValue(result);
		const {reset} = value[1];

		await act(async () => {
			reset(25);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(10);

		await act(async () => {
			reset(-10);
		});

		value = expectResultValue(result);
		expect(value[0]).toEqual(0);
	});
});
