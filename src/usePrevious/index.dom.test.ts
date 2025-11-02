import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {usePrevious} from '../index.js';

describe('usePrevious', () => {
	it('should be defined', async () => {
		expect(usePrevious).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => usePrevious());
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', async () => {
		const {result} = await renderHook(() => usePrevious());

		expect(result.value).toBeUndefined();
	});

	it('should return previously passed value on rerender', async () => {
		const {result, rerender} = await renderHook(({state}) => usePrevious(state), {
			initialProps: {state: 0},
		});

		expect(result.value).toBeUndefined();
		await rerender({state: 1});
		expect(result.value).toBe(0);
		await rerender({state: 5});
		expect(result.value).toBe(1);
		await rerender({state: 10});
		expect(result.value).toBe(5);
		await rerender({state: 25});
		expect(result.value).toBe(10);
	});

	it('should return passed value after unrelated rerender', async () => {
		const {result, rerender} = await renderHook(({state}) => usePrevious(state), {
			initialProps: {state: 0},
		});

		expect(result.value).toBeUndefined();
		await rerender();
		expect(result.value).toBe(0);
	});
});
