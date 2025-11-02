import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useKeyboardEvent} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useKeyboardEvent', () => {
	it('should be defined', () => {
		expect(useKeyboardEvent).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useKeyboardEvent('a', () => {});
		});
		expectResultValue(result);
	});
});
