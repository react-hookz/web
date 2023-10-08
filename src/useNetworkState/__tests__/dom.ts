import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useRef } from 'react';
import { useNetworkState } from '../..';

describe(`useNetworkState`, () => {
	it('should be defined', () => {
		expect(useNetworkState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useNetworkState());
		expect(result.error).toBeUndefined();
	});

	it('should return an object of certain structure', () => {
		const hook = renderHook(() => useNetworkState(), { initialProps: false });

		expect(typeof hook.result.current).toEqual('object');
		expect(Object.keys(hook.result.current)).toEqual([
			'online',
			'previous',
			'since',
			'downlink',
			'downlinkMax',
			'effectiveType',
			'rtt',
			'saveData',
			'type',
		]);
	});

	it('should rerender in case of online or offline events emitted on window', () => {
		const hook = renderHook(
			() => {
				const renderCount = useRef(0);
				return [useNetworkState(), ++renderCount.current];
			},
			{ initialProps: false }
		);

		expect(hook.result.current[1]).toBe(1);
		const previousNWState = hook.result.current[0];

		act(() => {
			window.dispatchEvent(new Event('online'));
		});
		expect(hook.result.current[1]).toBe(2);
		expect(hook.result.current[0]).not.toBe(previousNWState);
	});
});
