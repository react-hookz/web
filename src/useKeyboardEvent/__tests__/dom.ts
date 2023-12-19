import { renderHook } from '@testing-library/react-hooks/dom';
import { type KeyboardEventFilter, useKeyboardEvent } from '#root/index.js';

describe('useKeyboardEvent', () => {
	it('should be defined', () => {
		expect(useKeyboardEvent).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useKeyboardEvent('a', () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind listener on mount and unbind on unmount', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(div, 'addEventListener');
		const removeSpy = jest.spyOn(div, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => {
			useKeyboardEvent(
				() => true,
				() => {},
				undefined,
				{ target: div, event: 'keydown', eventOptions: { passive: true } }
			);
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should work with react refs', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(div, 'addEventListener');
		const removeSpy = jest.spyOn(div, 'removeEventListener');

		const ref = { current: div };
		const { rerender, unmount } = renderHook(() => {
			useKeyboardEvent(
				() => true,
				() => {},
				undefined,
				{ target: ref, eventOptions: { passive: true } }
			);
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(addSpy.mock.calls[0][2]).toStrictEqual({ passive: true });
		expect(removeSpy).toHaveBeenCalledTimes(0);

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function on the event trigger with proper context', () => {
		const div = document.createElement('div');
		let context: any;
		const spy = jest.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		renderHook(() => {
			useKeyboardEvent(() => true, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: { passive: true },
			});
		});

		const evt = new KeyboardEvent('keydown', { key: 'a' });
		div.dispatchEvent(evt);
		expect(context).toBe(div);

		expect(spy).toHaveBeenCalledWith(evt);
		div.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function based on string key filter with proper context', () => {
		const div = document.createElement('div');
		let context: any;
		const spy = jest.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		renderHook(() => {
			useKeyboardEvent('a', spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: { passive: true },
			});
		});

		const evt = new KeyboardEvent('keydown', { key: 'a' });
		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);

		div.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should invoke provided function based on function key filter with proper context', () => {
		const div = document.createElement('div');
		let context: any;
		const spy = jest.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		renderHook(() => {
			useKeyboardEvent((ev) => ev.metaKey, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: { passive: true },
			});
		});

		const evt = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);

		div.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should fallback to boolean when key filter is not function or string', () => {
		const div = document.createElement('div');
		const spy = jest.fn();

		const { unmount } = renderHook(() => {
			useKeyboardEvent(null, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: { passive: true },
			});
		});
		const evt = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
		div.dispatchEvent(evt);
		expect(spy).not.toHaveBeenCalledWith(evt);
		unmount();

		renderHook(() => {
			useKeyboardEvent({} as KeyboardEventFilter, spy, undefined, {
				target: div,
				event: 'keydown',
				eventOptions: { passive: true },
			});
		});

		div.dispatchEvent(evt);
		expect(spy).toHaveBeenCalledWith(evt);
	});
});
