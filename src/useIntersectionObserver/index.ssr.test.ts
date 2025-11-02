import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useIntersectionObserver} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useIntersectionObserver', () => {
	it('should be defined', () => {
		expect(useIntersectionObserver).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useIntersectionObserver(null));
		expect(result.error).toBeUndefined();
		expectResultValue(result);
	});
});
