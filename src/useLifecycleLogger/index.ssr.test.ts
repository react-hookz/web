import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useLifecycleLogger} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useLifecycleLogger', () => {
	it('should be defined', () => {
		expect(useLifecycleLogger).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useLifecycleLogger('TestComponent');
		});
		expectResultValue(result);
	});
});
