import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useSyncedRef} from '../index.js';

describe('useSyncedRef', () => {
	it('should be defined', () => {
		expect(useSyncedRef).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useSyncedRef(1));
		expect(result.error).toBeUndefined();
	});

	it('should return ref object', () => {
		const {result} = renderHook(() => useSyncedRef(1));

		expect(result.current).toEqual({current: 1});
	});
});
