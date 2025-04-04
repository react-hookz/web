import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {usePreviousDistinct} from '../index.js';
import {isStrictEqual} from '../util/const.js';

describe('usePreviousDistinct', () => {
	it('should be defined', () => {
		expect(usePreviousDistinct).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => usePreviousDistinct(0));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', () => {
		const {result} = renderHook(() => usePreviousDistinct(0));

		expect(result.current).toBeUndefined();
	});

	it('should return undefined on first render with compare function passed', () => {
		const {result} = renderHook(() => usePreviousDistinct(0, isStrictEqual));

		expect(result.current).toBeUndefined();
	});
});
