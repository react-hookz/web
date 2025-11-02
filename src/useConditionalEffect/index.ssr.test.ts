import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useConditionalEffect} from '../index.js';

describe('useConditionalEffect', () => {
	it('should be defined', () => {
		expect(useConditionalEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useConditionalEffect(() => {}, undefined, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not invoke nor effect nor predicate', async () => {
		const spy = vi.fn();
		const predicateSpy = vi.fn((array: unknown[]) => array.some(Boolean));
		await renderHook(() => {
			useConditionalEffect(spy, undefined, [true], predicateSpy);
		});
		expect(predicateSpy).toHaveBeenCalledTimes(0);
		expect(spy).toHaveBeenCalledTimes(0);
	});
});
