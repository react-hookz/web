import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {usePreviousDistinct} from '../index.js';
import type {Predicate} from '../types.js';
import {isStrictEqual} from '../util/const.js';

describe('usePreviousDistinct', () => {
	it('should be defined', async () => {
		expect(usePreviousDistinct).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0));
		expect(result.value).toBeUndefined();
	});

	it('should return undefined on first render with compare function passed', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0, isStrictEqual));
		expect(result.value).toBeUndefined();
	});

	it('should not invoke predicate on first render', async () => {
		const mockedCompare = vi.fn() as Predicate;

		const {result} = await renderHook(() => usePreviousDistinct(0, mockedCompare));
		expect(result.value).toBeUndefined();
		expect(mockedCompare).not.toHaveBeenCalled();
	});

	it('should not return passed value after unrelated rerender', async () => {
		const {result, rerender} = await renderHook(({state}) => usePreviousDistinct(state), {
			initialProps: {state: 0},
		});

		expect(result.value).toBeUndefined();
		await rerender();
		expect(result.value).not.toBe(0);
		expect(result.value).toBeUndefined();
	});

	it('should return passed value after related rerender', async () => {
		const {result, rerender} = await renderHook(({state}) => usePreviousDistinct(state), {
			initialProps: {state: 0},
		});

		expect(result.value).toBeUndefined(); // Asserting against initial render.
		await rerender({state: 1});
		expect(result.value).toBe(0); // Asserting against first re-render. value has now changed
	});

	it('should update previous value only after render with different value', async () => {
		const {result, rerender} = await renderHook(({state}) => usePreviousDistinct(state), {
			initialProps: {state: 0},
		});

		expect(result.value).toBeUndefined();
		await rerender({state: 1}); // Update
		expect(result.value).toBe(0);
		await rerender({state: 5}); // Update
		expect(result.value).toBe(1);
		await rerender({state: 5}); // No update
		expect(result.value).toBe(1);
	});

	it('should not update to value if it never changes, depsite rerenders', async () => {
		const value = 'yo';
		const {result, rerender} = await renderHook(({state}) => usePreviousDistinct(state), {
			initialProps: {state: value},
		});

		expect(result.value).toBeUndefined();
		await rerender({state: value});
		expect(result.value).toBeUndefined();
		await rerender({state: value});
		expect(result.value).toBeUndefined();
		await rerender({state: value});
	});

	it('should update even when going between defined and undefined values', async () => {
		const {result, rerender} = await renderHook<{state: number | undefined}, number | undefined>(
			({state}: {state: number | undefined}) => usePreviousDistinct(state),
			{
				initialProps: {state: 0},
			},
		);

		expect(result.value).toBeUndefined();
		await rerender({state: 1});
		expect(result.value).toBe(0);
		await rerender({state: undefined});
		expect(result.value).toBe(1);
		await rerender({state: 10});
		expect(result.value).toBeUndefined();
	});
});
