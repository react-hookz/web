import { renderHook } from '@testing-library/react-hooks/dom';
import { type MutableRefObject } from 'react';
import { useClickOutside } from '../..';

describe('useClickOutside', () => {
	it('should be defined', () => {
		expect(useClickOutside).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useClickOutside({ current: null }, () => {});
		});
		expect(result.error).toBeUndefined();
	});

	it('should bind document listener on mount and unbind on unmount', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(document, 'addEventListener');
		const removeSpy = jest.spyOn(document, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => {
			useClickOutside({ current: div }, () => {});
		});

		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(2);
		expect(removeSpy).toHaveBeenCalledTimes(2);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should bind any events passed as 3rd parameter', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(document, 'addEventListener');
		const removeSpy = jest.spyOn(document, 'removeEventListener');

		const { unmount } = renderHook(() => {
			useClickOutside({ current: div }, () => {}, ['click']);
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should invoke callback if event target is not a child of target', () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = jest.fn();

		renderHook(() => {
			useClickOutside({ current: div }, spy);
		});

		document.body.append(div, div2);

		div2.dispatchEvent(new Event('mousedown', { bubbles: true }));
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should not execute callback if event target is a child of target', () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = jest.fn();

		renderHook(() => {
			useClickOutside({ current: div }, spy);
		});

		document.body.append(div);
		div.append(div2);

		div2.dispatchEvent(new Event('mousedown', { bubbles: true }));
		expect(spy).not.toHaveBeenCalled();
	});

	it('should not execute callback if target is unmounted', () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div2');
		const spy = jest.fn();
		const ref: MutableRefObject<HTMLDivElement | null> = { current: div };

		const { rerender } = renderHook(() => {
			useClickOutside(ref, spy);
		});

		document.body.append(div);
		div.append(div2);

		ref.current = null;
		rerender();

		div2.dispatchEvent(new Event('mousedown', { bubbles: true }));
		expect(spy).not.toHaveBeenCalled();
	});
});
