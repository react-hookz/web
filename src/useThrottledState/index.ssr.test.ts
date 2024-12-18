import {renderHook} from '@testing-library/react-hooks/server';
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

	it('should be defined', () => {
		expect(useThrottledState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useThrottledState('', 200));
		expect(result.error).toBeUndefined();
	});
});
