import {act, renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useDocumentVisibility} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useDocumentVisibility', () => {
	it('should be defined', async () => {
		expect(useDocumentVisibility).toBeDefined();
	});

	it('should return current visibility state if initializing with value', async () => {
		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'hidden',
		});
		const hook1 = await renderHook(() => useDocumentVisibility());
		expect(hook1.result.value).toBe(false);

		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'visible',
		});
		const hook2 = await renderHook(() => useDocumentVisibility(true));
		expect(hook2.result.value).toBe(true);
	});

	it('should return undefined on first render and set state on effects stage if not initializing with value', async () => {
		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'hidden',
		});

		{
			const {result} = await renderHook(() => useDocumentVisibility(false));

			expect(result.value).toBe(false);
			expect(expectResultValue(result.all[0])).toBe(undefined);
		}

		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'visible',
		});

		{
			const {result} = await renderHook(() => useDocumentVisibility(false));

			expect(result.value).toBe(true);
			expect(expectResultValue(result.all[0])).toBe(undefined);
		}
	});

	it('should update state on visibilitychange event', async () => {
		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'hidden',
		});

		const {result} = await renderHook(() => useDocumentVisibility());

		expect(result.value).toBe(false);

		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			value: 'visible',
		});

		await act(async () => {
			document.dispatchEvent(new Event('visibilitychange'));
		});

		expect(result.value).toBe(true);
	});
});
