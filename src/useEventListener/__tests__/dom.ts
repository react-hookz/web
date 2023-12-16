import { renderHook } from '@testing-library/react-hooks/dom';
import { useEventListener } from '#root/index.js';

describe('useEventListener', () => {
	it('should be defined', () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useEventListener(null, '', () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind listener on mount and unbind on unmount', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(div, 'addEventListener');
		const removeSpy = jest.spyOn(div, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => {
			useEventListener(div, 'resize', () => {}, { passive: true });
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
			useEventListener(ref, 'resize', () => {}, { passive: true });
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

	it('should invoke provided function on event trigger with proper context', () => {
		const div = document.createElement('div');
		let context: any;
		const spy = jest.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		renderHook(() => {
			useEventListener(div, 'resize', spy, { passive: true });
		});

		const evt = new Event('resize');
		div.dispatchEvent(evt);

		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);
	});

	it('should properly handle event listener objects', () => {
		const div = document.createElement('div');
		let context: any;
		const spy = jest.fn(function (this: any) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-unsafe-assignment,unicorn/no-this-assignment
			context = this;
		});

		renderHook(() => {
			useEventListener(div, 'resize', { handleEvent: spy }, { passive: true });
		});

		const evt = new Event('resize');
		div.dispatchEvent(evt);

		expect(spy).toHaveBeenCalledWith(evt);
		expect(context).toBe(div);
	});
});
