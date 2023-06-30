import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useState } from 'react';
import { useWindowSize, type WindowSize } from '../..';

describe('useWindowSize', () => {
	beforeEach(() => {
		window.innerWidth = 100;
		window.innerHeight = 100;
	});

	const triggerResize = (dimension: 'width' | 'height', value: number) => {
		if (dimension === 'width') {
			window.innerWidth = value;
		} else if (dimension === 'height') {
			window.innerHeight = value;
		}

		act(() => {
			window.dispatchEvent(new Event('resize'));
		});
	};

	it('should be defined', () => {
		expect(useWindowSize).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useWindowSize());
		expect(result.error).toBeUndefined();
	});

	it('should use provided state hook', () => {
		const { result } = renderHook(() => useWindowSize(useState));

		expect(result.current.width).toBe(100);
		expect(result.current.height).toBe(100);
		expect(result.all.length).toBe(1);

		triggerResize('width', 200);
		expect(result.current.width).toBe(200);
		expect(result.current.height).toBe(100);
		expect(result.all.length).toBe(2);

		triggerResize('height', 200);
		expect(result.current.width).toBe(200);
		expect(result.current.height).toBe(200);
		expect(result.all.length).toBe(3);
	});

	it('should delay measurement to effects stage if 2nd argument is `true`', () => {
		const { result } = renderHook(() => useWindowSize(useState, true));

		expect((result.all[0] as WindowSize).width).toBe(0);
		expect((result.all[0] as WindowSize).height).toBe(0);

		expect(result.current.width).toBe(100);
		expect(result.current.height).toBe(100);
	});
});
