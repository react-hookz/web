import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useTimeoutEffect} from '../index.js';

describe('useTimeoutEffect', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	beforeEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be defined', async () => {
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should not invoke callback after timeout', async () => {
		const spy = vi.fn();
		await renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();
	});
});
