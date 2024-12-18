import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedState} from '../index.js';

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

	it('should be defined', () => {
		expect(useDebouncedState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useDebouncedState(undefined, 200));
		expect(result.error).toBeUndefined();
	});

	it('should debounce state set', () => {
		const {result} = renderHook(() => useDebouncedState<string | undefined>(undefined, 200));

		expect(result.current[0]).toBe(undefined);
		result.current[1]('Hello world!');

		act(() => {
			vi.advanceTimersByTime(199);
		});
		expect(result.current[0]).toBe(undefined);

		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current[0]).toBe('Hello world!');
	});
});
