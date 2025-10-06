import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useMediaQuery} from '../index.js';

describe('useMediaQuery', () => {
	it('should be defined', () => {
		expect(useMediaQuery).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render, if initializeWithValue is set to false', async () => {
		const {result} = await renderHook(() => useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.value).toBeUndefined();
	});
});
