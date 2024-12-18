import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it, vi} from 'vitest';
import {useConditionalEffect} from '../index.js';

describe('useConditionalEffect', () => {
	it('should be defined', () => {
		expect(useConditionalEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useConditionalEffect(() => {}, undefined, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not invoke nor effect nor predicate', () => {
		const spy = vi.fn();
		const predicateSpy = vi.fn((array: unknown[]) => array.some(Boolean));
		renderHook(() => {
			useConditionalEffect(spy, undefined, [true], predicateSpy);
		});
		expect(predicateSpy).toHaveBeenCalledTimes(0);
		expect(spy).toHaveBeenCalledTimes(0);
	});
});
