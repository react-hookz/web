import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useSessionStorageValue} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useSessionStorageValue', () => {
	it('should be defined', () => {
		expect(useSessionStorageValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useSessionStorageValue('foo');
		});
		expectResultValue(result);
	});
});
