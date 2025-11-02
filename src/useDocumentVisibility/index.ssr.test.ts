import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useDocumentVisibility} from '../index.js';

describe('useDocumentVisibility', () => {
	it('should be defined', () => {
		expect(useDocumentVisibility).toBeDefined();
	});

	it('should return undefined regardless of `initializeWithValue` parameter', async () => {
		const hook1 = await renderHook(() => useDocumentVisibility());
		expect(hook1.result.value).toBeUndefined();
		const hook2 = await renderHook(() => useDocumentVisibility(true));
		expect(hook2.result.value).toBeUndefined();
		const hook3 = await renderHook(() => useDocumentVisibility(false));
		expect(hook3.result.value).toBeUndefined();
	});
});
