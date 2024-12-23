import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {usePrevious} from '../index.js';

describe('usePrevious', () => {
	it('should be defined', () => {
		expect(usePrevious).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => usePrevious());
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', () => {
		const {result} = renderHook(() => usePrevious());

		expect(result.current).toBeUndefined();
	});
});
