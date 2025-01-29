import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useMediaQuery} from '../index.js';

describe('useMediaQuery', () => {
	it('should be defined', () => {
		expect(useMediaQuery).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() =>
			useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render, if initializeWithValue is set to false', () => {
		const {result} = renderHook(() =>
			useMediaQuery('max-width : 768px', {initializeWithValue: false}));
		expect(result.current).toBeUndefined();
	});

	it('should return undefined on first render, when not enabled and initializeWithValue is set to true', () => {
		const {result} = renderHook(() =>
			useMediaQuery('max-width : 768px', {initializeWithValue: true, enabled: false}));
		expect(result.error).toBeUndefined();
		expect(result.current).toBeUndefined();
	});
});
