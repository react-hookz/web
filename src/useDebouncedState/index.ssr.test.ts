import {renderHook} from '@testing-library/react-hooks/server';
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
});
