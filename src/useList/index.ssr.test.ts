import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useList} from '../index.js';

describe('useList', () => {
	it('should be defined', () => {
		expect(useList).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useList([1, 0, 2]));
		expect(result.error).toBeUndefined();
	});
});
