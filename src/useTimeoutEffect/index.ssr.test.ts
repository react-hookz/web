import {renderHook} from '@testing-library/react-hooks/server';
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

	it('should be defined', () => {
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should not invoke callback after timeout', () => {
		const spy = vi.fn();
		renderHook(() => useTimeoutEffect(spy, 100));

		vi.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();
	});
});
