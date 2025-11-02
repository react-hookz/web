import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useCustomCompareEffect} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useCustomCompareEffect', () => {
	it('should be defined', () => {
		expect(useCustomCompareEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useCustomCompareEffect(() => {}, []);
		});
		expectResultValue(result);
	});

	it('should not invoke comparator', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => {
			useCustomCompareEffect(() => {}, [], spy);
		});
		expectResultValue(result);
		expect(spy).not.toHaveBeenCalled();
	});
});
