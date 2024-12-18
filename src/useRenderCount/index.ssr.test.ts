import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useRenderCount} from '../index.js';

describe('useRendersCount', () => {
	it('should be defined', () => {
		expect(useRenderCount).toBeDefined();
	});

	it('should return proper amount of renders performed', () => {
		const {result} = renderHook(useRenderCount);

		expect(result.current).toBe(1);
	});
});
