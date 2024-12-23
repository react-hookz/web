import {renderHook} from '@testing-library/react-hooks/server';
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
});
