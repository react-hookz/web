import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledState} from '../index.js';

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
});
