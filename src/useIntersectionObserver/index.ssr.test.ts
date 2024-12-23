import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useIntersectionObserver} from '../index.js';

describe('useIntersectionObserver', () => {
	it('should be defined', () => {
		expect(useIntersectionObserver).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useIntersectionObserver(null));
		expect(result.error).toBeUndefined();
	});
});
