import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useDeepCompareMemo} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useDeepCompareMemo', () => {
	it('should be defined', () => {
		expect(useDeepCompareMemo).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDeepCompareMemo(() => {}, []);
		});
		expectResultValue(result);
	});
});
