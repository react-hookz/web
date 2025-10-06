import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it, vi} from 'vitest';
import type {KeyboardEventFilter} from '../index.js';
import {useKeyboardEvent} from '../index.js';

describe('useKeyboardEvent', () => {
	it('should be defined', async () => {
		expect(useKeyboardEvent).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useKeyboardEvent('a', () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind listener on mount and unbind on unmount', async () => {
		const div = document.createElement('div');
		const addSpy = vi.spyOn(div, 'addEventListener');
		const removeSpy = vi.spyOn(div, 'removeEventListener');

		const {rerender, unmount} = await renderHook(() => {
			useKeyboardEvent(
				() => true,
				() => {},
				undefined,
				{target: div, event: 'keydown', eventOptions: {passive: true}},
			);
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
			useKeyboardEvent(
				() => true,
				() => {},
				undefined,
				{target: ref, eventOptions: {passive: true}},
			);
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

	it('should invoke provided function on the event trigger with proper context', async () => {
		const div = document.createElement('div');
		let context: any;
		const spy = vi.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		await renderHook(() => {
			useKeyboardEvent(() => true, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: {passive: true},
			});
		});

		const evt = new KeyboardEvent('keydown', {key: 'a'});
		div.dispatchEvent(evt);
		expect(context).toBe(div);

		expect(spy).toHaveBeenCalledWith(evt);
		div.dispatchEvent(new KeyboardEvent('keyup', {key: 'a'}));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function based on string key filter with proper context', async () => {
		const div = document.createElement('div');
		let context: any;
		const spy = vi.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		await renderHook(() => {
			useKeyboardEvent('a', spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: {passive: true},
			});
		});

		const evt = new KeyboardEvent('keydown', {key: 'a'});
		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);

		div.dispatchEvent(new KeyboardEvent('keydown', {key: 'b'}));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function based on function key filter with proper context', async () => {
		const div = document.createElement('div');
		let context: any;
		const spy = vi.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		await renderHook(() => {
			useKeyboardEvent((ev) => ev.metaKey, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: {passive: true},
			});
		});

		const evt = new KeyboardEvent('keydown', {key: 'a', metaKey: true});
		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);

		div.dispatchEvent(new KeyboardEvent('keydown', {key: 'b'}));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should fallback to boolean when key filter is not function or string - null filter', async () => {
		const div = document.createElement('div');
		const spy = vi.fn();

		const {unmount} = await renderHook(() => {
			useKeyboardEvent(null, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: {passive: true},
			});
		});
		const evt = new KeyboardEvent('keydown', {key: 'a', metaKey: true});
		div.dispatchEvent(evt);
		expect(spy).not.toHaveBeenCalledWith(evt);
		await unmount();
	});

	it('should fallback to boolean when key filter is not function or string - object filter', async () => {
		const div = document.createElement('div');
		const spy = vi.fn();

		const {unmount} = await renderHook(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			useKeyboardEvent({} as KeyboardEventFilter, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: {passive: true},
			});
		});

		const evt = new KeyboardEvent('keydown', {key: 'a', metaKey: true});
		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
		await unmount();
	});
});
