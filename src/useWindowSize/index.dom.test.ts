import {act, renderHook} from '@ver0/react-hooks-testing';
import {useState} from 'react';
import {beforeEach, describe, expect, it} from 'vitest';
import {useWindowSize} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

const triggerResize = async (dimension: 'width' | 'height', value: number) => {
	if (dimension === 'width') {
		window.innerWidth = value;
	} else if (dimension === 'height') {
		window.innerHeight = value;
	}

	await act(async () => {
		globalThis.dispatchEvent(new Event('resize'));
	});
};

describe('useWindowSize', () => {
	beforeEach(() => {
		window.innerWidth = 100;
		window.innerHeight = 100;
	});

	it('should be defined', async () => {
		expect(useWindowSize).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useWindowSize());
		expect(result.error).toBeUndefined();
	});

	it('should use provided state hook', async () => {
		const {result} = await renderHook(() => useWindowSize(useState));
		expect(result.error).toBeUndefined();

		const value = expectResultValue(result);
		expect(value.width).toBe(100);
		expect(value.height).toBe(100);
		expect(result.all.length).toBe(1);

		await triggerResize('width', 200);
		const value2 = expectResultValue(result);
		expect(value2.width).toBe(200);
		expect(value2.height).toBe(100);
		expect(result.all.length).toBe(2);

		await triggerResize('height', 200);
		const value3 = expectResultValue(result);
		expect(value3.width).toBe(200);
		expect(value3.height).toBe(200);
		expect(result.all.length).toBe(3);
	});

	it('should delay measurement to effects stage if 2nd argument is `true`', async () => {
		const {result} = await renderHook(() => useWindowSize(useState, true));
		expect(result.error).toBeUndefined();

		const initialValue = expectResultValue(result.all[0]);
		expect(initialValue.width).toBe(0);
		expect(initialValue.height).toBe(0);

		const value4 = expectResultValue(result);
		expect(value4.width).toBe(100);
		expect(value4.height).toBe(100);
	});
});
