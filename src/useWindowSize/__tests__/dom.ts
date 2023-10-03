import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { useWindowSize } from '../..';

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
		expect(() => {
			renderHook(() => useWindowSize());
		}).not.toThrow();
	});

	it('should use provided state hook', () => {
		const { result } = renderHook(() => useWindowSize(useState));

		expect(result.current.width).toBe(100);
		expect(result.current.height).toBe(100);

		triggerResize('height', 200);
		expect(result.current.width).toBe(200);
		expect(result.current.height).toBe(100);

		triggerResize('height', 200);
		expect(result.current.width).toBe(200);
		expect(result.current.height).toBe(200);
	});

	it('should delay measurement to effects stage if 2nd argument is `true`', () => {
		const { result } = renderHook(() => useWindowSize(useState, true));

		expect(result.current.width).toBe(100);
		expect(result.current.height).toBe(100);
	});
});
