import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useCustomCompareMemo} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useCustomCompareMemo', () => {
	it('should be defined', () => {
		expect(useCustomCompareMemo).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() =>
			useCustomCompareMemo(
				() => ({user: {name: 'John'}}),
				[],
				() => true,
			),
		);
		expectResultValue(result);
	});
});
