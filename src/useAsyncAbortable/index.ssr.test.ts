import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useAsyncAbortable} from '../index.js';

describe('useAsyncAbortable', () => {
	it('should be defined', () => {
		expect(useAsyncAbortable).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useAsyncAbortable(async () => {}));
		expect(result.error).toBeUndefined();
	});
});
