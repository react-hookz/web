import {renderHook} from '@testing-library/react-hooks/server';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {useThrottledEffect} from '../index.js';

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

	it('should be defined', () => {
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useThrottledEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});
});
