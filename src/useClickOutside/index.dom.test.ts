import {renderHook} from '@ver0/react-hooks-testing';
import type {RefObject} from 'react';
import {describe, expect, it, vi} from 'vitest';
import {useClickOutside} from '../index.js';

describe('useClickOutside', () => {
	it('should be defined', async () => {
		expect(useClickOutside).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useClickOutside({current: null}, () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind document listener on mount and unbind on unmount', async () => {
		const div = document.createElement('div');
		const addSpy = vi.spyOn(document, 'addEventListener');
		const removeSpy = vi.spyOn(document, 'removeEventListener');

		const {rerender, unmount} = await renderHook(() => {
			useClickOutside({current: div}, () => {});
		});

		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(0);
		await rerender();
		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		await unmount();
		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(2);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should bind any events passed as 3rd parameter', async () => {
		const div = document.createElement('div');
		const addSpy = vi.spyOn(document, 'addEventListener');
		const removeSpy = vi.spyOn(document, 'removeEventListener');

		const {unmount} = await renderHook(() => {
			useClickOutside({current: div}, () => {}, ['click']);
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		await unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should invoke callback if event target is not a child of target', async () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = vi.fn();

		await renderHook(() => {
			useClickOutside({current: div}, spy);
		});

		document.body.append(div, div2);

		div2.dispatchEvent(new Event('mousedown', {bubbles: true}));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should not execute callback if event target is a child of target', async () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = vi.fn();

		await renderHook(() => {
			useClickOutside({current: div}, spy);
		});

		document.body.append(div);
		div.append(div2);

		div2.dispatchEvent(new Event('mousedown', {bubbles: true}));
		expect(spy).not.toHaveBeenCalled();
	});

	it('should not execute callback if target is unmounted', async () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = vi.fn();
		const ref: RefObject<HTMLDivElement | null> = {current: div};

		const {rerender} = await renderHook(() => {
			useClickOutside(ref, spy);
		});

		document.body.append(div);
		div.append(div2);

		ref.current = null;
		await rerender();

		div2.dispatchEvent(new Event('mousedown', {bubbles: true}));
		expect(spy).not.toHaveBeenCalled();
	});
});
