import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useDeepCompareEffect} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useDeepCompareEffect', () => {
	it('should be defined', () => {
		expect(useDeepCompareEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDeepCompareEffect(() => {}, []);
		});
		expectResultValue(result);
	});
});
