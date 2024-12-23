import {renderHook} from '@testing-library/react-hooks';
import {describe, expect, it} from 'vitest';
import {useRenderCount} from '../index.js';

describe('useRendersCount', () => {
	it('should be defined', () => {
		expect(useRenderCount).toBeDefined();
	});

	it('should return amount of renders performed', () => {
		const {result, rerender} = renderHook(useRenderCount);

		expect(result.current).toBe(1);
		rerender();
		expect(result.current).toBe(2);
	});
});
