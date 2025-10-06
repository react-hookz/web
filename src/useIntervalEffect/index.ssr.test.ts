import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useIntervalEffect} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useIntervalEffect', () => {
	it('should be defined', () => {
		expect(useIntervalEffect).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useIntervalEffect(() => {}, 123);
		});
		expectResultValue(result);
	});
});
