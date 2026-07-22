import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useQueue} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useQueue', () => {
	it('should be defined', () => {
		expect(useQueue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useQueue());
		expect(result.error).toBeUndefined();
	});

	it('should return an object', async () => {
		const {result} = await renderHook(() => useQueue());
		expect(expectResultValue(result)).toBeInstanceOf(Object);
	});
});
