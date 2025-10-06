import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useClickOutside} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useClickOutside', () => {
	it('should be defined', () => {
		expect(useClickOutside).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useClickOutside({current: null}, () => {});
		});
		expectResultValue(result);
	});
});
