import {act, renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import {useRerender} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useRerender', () => {
	it('should be defined', () => {
		expect(useRerender).toBeDefined();
	});

	it('should do nothing on returned function invocation', async () => {
		const {result} = await renderHook(() => {
			const cnt = useRef(0);
			const rerender = useRerender();

			return [rerender, ++cnt.current] as const;
		});

		const value = expectResultValue(result);
		expect(value[1]).toBe(1);
		await act(async () => {
			value[0]();
		});
		expect(value[1]).toBe(1);
		await act(async () => {
			value[0]();
		});
		expect(value[1]).toBe(1);
	});
});
