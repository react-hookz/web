import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useRafCallback} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useRafCallback', () => {
	it('should be defined', () => {
		expect(useRafCallback).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useRafCallback(() => {}));
		expect(result.error).toBeUndefined();
	});

	it('should return array of functions', async () => {
		const {result} = await renderHook(() => useRafCallback(() => {}));
		const value = expectResultValue(result);

		expect(value).toBeInstanceOf(Array);
		expect(value[0]).toBeInstanceOf(Function);
		expect(value[1]).toBeInstanceOf(Function);
	});

	it('should not do anything on returned functions invocation', async () => {
		const spy = vi.fn();
		const {result} = await renderHook(() => useRafCallback(spy));
		const value = expectResultValue(result);

		value[0]();
		value[1]();

		expect(spy).not.toHaveBeenCalled();
	});
});
