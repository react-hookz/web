import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vite-plus/test';
import {useWindowSize} from '../index.js';

describe('useWindowSize', () => {
	it('should be defined', () => {
		expect(useWindowSize).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useWindowSize());
		expect(result.error).toBeUndefined();
	});
});
