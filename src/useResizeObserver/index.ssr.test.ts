import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useResizeObserver} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useResizeObserver', () => {
	it('should be defined', () => {
		expect(useResizeObserver).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useResizeObserver(null, () => {});
		});
		expectResultValue(result);
	});
});
