import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useScreenOrientation} from '../index.js';

describe('useScreenOrientation', () => {
	it('should be defined', () => {
		expect(useScreenOrientation).toBeDefined();
	});

	it('should render if initializeWithValue option is set to false', async () => {
		const {result} = await renderHook(() => useScreenOrientation({initializeWithValue: false}));
		expect(result.error).toBeUndefined();
	});
});
