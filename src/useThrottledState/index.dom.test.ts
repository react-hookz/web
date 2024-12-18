import {act, renderHook} from '@testing-library/react-hooks/dom';
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

	it('should throttle set state', () => {
		const {result} = renderHook(() => useThrottledState('', 200, true));

		expect(result.current[0]).toBe('');
		act(() => {
			result.current[1]('hello world!');
		});
		expect(result.current[0]).toBe('hello world!');

		result.current[1]('foo');
		result.current[1]('bar');
		expect(result.current[0]).toBe('hello world!');
		vi.advanceTimersByTime(200);
		act(() => {
			result.current[1]('baz');
		});
		expect(result.current[0]).toBe('baz');
	});
});
