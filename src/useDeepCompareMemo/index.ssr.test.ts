import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useDeepCompareMemo} from '../index.js';

describe('useDeepCompareMemo', () => {
	it('should be defined', () => {
		expect(useDeepCompareMemo).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useDeepCompareMemo(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});
});
