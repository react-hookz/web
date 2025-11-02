import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useSyncedRef} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useSyncedRef', () => {
	it('should be defined', async () => {
		expect(useSyncedRef).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useSyncedRef(1));
		expect(result.error).toBeUndefined();
	});

	it('should return ref object', async () => {
		const {result} = await renderHook(() => useSyncedRef(1));

		const value = expectResultValue(result);
		expect(value).toEqual({current: 1});
	});

	it('should return same ref between renders', async () => {
		const {result, rerender} = await renderHook(() => useSyncedRef(1));

		const ref = expectResultValue(result);
		await rerender();
		expect(expectResultValue(result)).toEqual(ref);
		await rerender();
		expect(expectResultValue(result)).toEqual(ref);
		await rerender();
		expect(expectResultValue(result)).toEqual(ref);
	});

	it('should contain actual value on each render', async () => {
		const {result, rerender} = await renderHook(({val}) => useSyncedRef<any>(val), {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-type-assertion
			initialProps: {val: 1 as any},
		});

		let value = expectResultValue(result);
		expect(value.current).toBe(1);
		const value1 = {foo: 'bar'};
		await rerender({val: value1});
		value = expectResultValue(result);
		expect(value.current).toBe(value1);
		const value2 = ['a', 'b', 'c'];
		await rerender({val: value2});
		value = expectResultValue(result);
		expect(value.current).toBe(value2);
	});

	it('should throw on attempt to change ref', async () => {
		const {result} = await renderHook(() => useSyncedRef(1));
		const value = expectResultValue(result);

		expect(() => {
			// @ts-expect-error testing irrelevant usage
			value.foo = 'bar';
		}).toThrow(new TypeError('Cannot add property foo, object is not extensible'));

		expect(() => {
			// @ts-expect-error testing irrelevant usage
			value.current = 2;
		}).toThrow(new TypeError('Cannot set property current of #<Object> which has only a getter'));
	});
});
