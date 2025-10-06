import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useDebouncedEffect} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

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

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useDebouncedEffect(() => {}, [], 200);
		});
		expectResultValue(result);
	});
});
