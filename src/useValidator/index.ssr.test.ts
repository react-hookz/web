import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useValidator} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useValidator', () => {
	it('should be defined', () => {
		expect(useValidator).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useValidator(() => ({isValid: false}), []));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined validity on first render', async () => {
		const {result} = await renderHook(() => useValidator(() => ({isValid: true}), []));
		if (result.value !== undefined) {
			const value = expectResultValue(result);
			expect(value[0].isValid).toBeUndefined();
		}
	});

	it('should not call validator on first render', async () => {
		const spy = vi.fn(() => ({isValid: true}));
		await renderHook(() => useValidator(spy, []));
		expect(spy).not.toHaveBeenCalled();
	});
});
