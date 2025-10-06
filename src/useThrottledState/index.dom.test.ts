import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useThrottledState', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be defined', async () => {
		expect(useThrottledState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useThrottledState('', 200));
		expect(result.error).toBeUndefined();
	});

	it('should throttle set state', async () => {
		const {result} = await renderHook(() => useThrottledState('', 200, true));
		let value = expectResultValue(result);

		expect(value[0]).toBe('');
		await act(async () => {
			value[1]('hello world!');
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('hello world!');

		value[1]('foo');
		value[1]('bar');
		expect(value[0]).toBe('hello world!');
		vi.advanceTimersByTime(200);
		await act(async () => {
			value[1]('baz');
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('baz');
	});
});
