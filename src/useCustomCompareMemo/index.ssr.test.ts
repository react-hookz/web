import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useCustomCompareMemo} from '../index.js';

describe('useCustomCompareMemo', () => {
	it('should be defined', () => {
		expect(useCustomCompareMemo).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() =>
			useCustomCompareMemo(
				() => ({user: {name: 'John'}}),
				[],
				() => true,
			));
		expect(result.error).toBeUndefined();
	});
});
