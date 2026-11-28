import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useVibrate} from '../index.js';

describe('useVibrate', () => {
	it('should be defined', () => {
		expect(useVibrate).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useVibrate(true, 100);
		});

		expect(result.error).toBeUndefined();
	});
});
