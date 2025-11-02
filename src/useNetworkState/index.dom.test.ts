import {act, renderHook} from '@ver0/react-hooks-testing';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import {useNetworkState} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('useNetworkState', () => {
	it('should be defined', async () => {
		expect(useNetworkState).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useNetworkState());
		expectResultValue(result);
	});

	it('should return an object of certain structure', async () => {
		const hook = await renderHook(() => useNetworkState(), {initialProps: false});
		const value = expectResultValue(hook.result);

		expect(typeof value).toEqual('object');
		expect(Object.keys(value)).toEqual([
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

	it('should rerender in case of online or offline events emitted on window', async () => {
		const hook = await renderHook(
			() => {
				const renderCount = useRef(0);
				return [useNetworkState(), ++renderCount.current];
			},
			{initialProps: false},
		);
		let value = expectResultValue(hook.result);

		expect(value[1]).toBe(1);
		const previousNWState = value[0];

		await act(async () => {
			globalThis.dispatchEvent(new Event('online'));
		});
		value = expectResultValue(hook.result);
		expect(value[1]).toBe(2);
		expect(value[0]).not.toBe(previousNWState);
	});
});
