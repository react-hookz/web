import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import {useEventListener} from '../index.js';

describe('useEventListener', () => {
	it('should be defined', async () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useEventListener(null, '', () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind listener on mount and unbind on unmount', async () => {
		const div = document.createElement('div');
		const addSpy = vi.spyOn(div, 'addEventListener');
		const removeSpy = vi.spyOn(div, 'removeEventListener');

		const {rerender, unmount} = await renderHook(() => {
			useEventListener(div, 'resize', () => {}, {passive: true});
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);
		await rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		await unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should work with react refs', async () => {
		const div = document.createElement('div');
		const addSpy = vi.spyOn(div, 'addEventListener');
		const removeSpy = vi.spyOn(div, 'removeEventListener');

		const ref = {current: div};
		const {rerender, unmount} = await renderHook(() => {
			useEventListener(ref, 'resize', () => {}, {passive: true});
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(addSpy.mock.calls[0][2]).toStrictEqual({passive: true});
		expect(removeSpy).toHaveBeenCalledTimes(0);
		await rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		await unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function on event trigger with proper context', async () => {
		const div = document.createElement('div');
		let context: any;
		const spy = vi.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		await renderHook(() => {
			useEventListener(div, 'resize', spy, {passive: true});
		});

		const evt = new Event('resize');
		div.dispatchEvent(evt);

		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);
	});

	it('should properly handle event listener objects', async () => {
		const div = document.createElement('div');
		let context: any;
		const spy = vi.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		await renderHook(() => {
			useEventListener(div, 'resize', {handleEvent: spy}, {passive: true});
		});

		const evt = new Event('resize');
		div.dispatchEvent(evt);

		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);
	});
});
