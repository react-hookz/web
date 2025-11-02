import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
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

	it('should render', async () => {
		const {result} = await renderHook(() => useDebouncedState(undefined, 200));
		expect(result.error).toBeUndefined();
	});
});
