import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useLocalStorageValue} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useLocalStorageValue', () => {
	it('should be defined', () => {
		expect(useLocalStorageValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useLocalStorageValue('foo');
		});
		expectResultValue(result);
	});
});
