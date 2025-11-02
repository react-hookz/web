import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledEffect} from '../index.js';
import {noop} from '../util/const.js';

describe('useThrottledEffect', () => {
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
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useThrottledEffect(noop, [], 200);
		});
		expect(result.error).toBeUndefined();
	});
});
