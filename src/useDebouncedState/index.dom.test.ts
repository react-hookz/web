import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useDebouncedState', () => {
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
		expect(useDebouncedState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useDebouncedState(undefined, 200));
		expect(result.error).toBeUndefined();
	});

	it('should debounce state set', async () => {
		const {result} = await renderHook(() => useDebouncedState<string | undefined>(undefined, 200));
		let value = expectResultValue(result);

		expect(value[0]).toBe(undefined);
		value[1]('Hello world!');

		await act(async () => {
			vi.advanceTimersByTime(199);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe(undefined);

		await act(async () => {
			vi.advanceTimersByTime(1);
		});
		value = expectResultValue(result);
		expect(value[0]).toBe('Hello world!');
	});
});
