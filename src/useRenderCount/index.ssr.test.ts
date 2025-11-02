import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useRenderCount} from '../index.js';

describe('useRendersCount', () => {
	it('should be defined', () => {
		expect(useRenderCount).toBeDefined();
	});

	it('should return proper amount of renders performed', async () => {
		const {result} = await renderHook(useRenderCount);

		expect(result.value).toBe(1);
	});
});
