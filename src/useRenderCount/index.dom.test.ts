import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useRenderCount} from '../index.js';

describe('useRendersCount', () => {
	it('should be defined', async () => {
		expect(useRenderCount).toBeDefined();
	});

	it('should return amount of renders performed', async () => {
		const {result, rerender} = await renderHook(useRenderCount);

		expect(result.value).toBe(1);
		await rerender();
		expect(result.value).toBe(2);
	});
});
