import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useEventListener} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useEventListener', () => {
	it('should be defined', () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useEventListener(null, 'random name', () => {});
		});
		expectResultValue(result);
	});
});
