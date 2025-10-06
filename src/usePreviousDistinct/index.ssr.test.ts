import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {usePreviousDistinct} from '../index.js';
import {isStrictEqual} from '../util/const.js';

describe('usePreviousDistinct', () => {
	it('should be defined', () => {
		expect(usePreviousDistinct).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined on first render', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0));

		expect(result.value).toBeUndefined();
	});

	it('should return undefined on first render with compare function passed', async () => {
		const {result} = await renderHook(() => usePreviousDistinct(0, isStrictEqual));

		expect(result.value).toBeUndefined();
	});
});
