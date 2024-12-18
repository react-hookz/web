import { act, renderHook } from '@testing-library/react-hooks/dom';
import { type BaseSyntheticEvent, useRef } from 'react';
import { useToggle } from '../../index.js';

describe('useToggle', () => {
	it('should be defined', () => {
		expect(useToggle).toBeDefined();
	});

	it('should default to false', () => {
		const { result } = renderHook(() => useToggle());

		expect(result.current[0]).toBe(false);
	});

	it('should be instantiatable with value', () => {
		let { result } = renderHook(() => useToggle(true));
		expect(result.current[0]).toBe(true);

		result = renderHook(() => useToggle(() => true)).result;
		expect(result.current[0]).toBe(true);

		result = renderHook(() => useToggle(() => false)).result;
		expect(result.current[0]).toBe(false);
	});

	it('should change state to the opposite when toggler called without args or undefined', () => {
		const { result } = renderHook(() => useToggle());
		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(false);
	});

	it('should not rerender when toggler called with same value', () => {
		const { result } = renderHook(() => {
			const cnt = useRef(0);

			return [...useToggle(), ++cnt.current] as const;
		});
		expect(result.current[0]).toBe(false);
		expect(result.current[2]).toBe(1);

		act(() => {
			result.current[1](false);
		});
		expect(result.current[2]).toBe(1);

		act(() => {
			result.current[1](false);
		});
		expect(result.current[2]).toBe(1);
	});

	it('should change state to one that passed to toggler', () => {
		const { result } = renderHook(() => useToggle(false, false));
		act(() => {
			result.current[1](false);
		});
		expect(result.current[0]).toBe(false);

		act(() => {
			result.current[1](true);
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[1](() => false);
		});
		expect(result.current[0]).toBe(false);

		act(() => {
			result.current[1](() => true);
		});
		expect(result.current[0]).toBe(true);
	});

	it('should not account react events', () => {
		const { result } = renderHook(() => useToggle());

		act(() => {
			result.current[1]({ _reactName: 'abcdef' } as unknown as BaseSyntheticEvent);

			result.current[1]({ _reactName: 'abcdef' } as unknown as BaseSyntheticEvent);
		});
		expect(result.current[0]).toBe(false);

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-extraneous-class
			result.current[1](new (class SyntheticBaseEvent {})() as unknown as BaseSyntheticEvent);
		});
		expect(result.current[0]).toBe(true);
	});
});
