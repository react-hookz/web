import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedEffect} from '../index.js';

describe('useDebouncedEffect', () => {
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
		expect(useDebouncedEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDebouncedEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should call effect only after delay', () => {
		const spy = vi.fn();

		renderHook(() => {
			useDebouncedEffect(spy, [], 200);
		});
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(199);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
