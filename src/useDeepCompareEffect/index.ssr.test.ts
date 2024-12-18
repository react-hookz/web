import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useDeepCompareEffect} from '../index.js';

describe('useDeepCompareEffect', () => {
	it('should be defined', () => {
		expect(useDeepCompareEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDeepCompareEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});
});
